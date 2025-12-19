import tkinter as tk
from tkinter import ttk, messagebox
import numpy as np
import sounddevice as sd
import threading
import json
import os
from datetime import datetime

class HearingTestApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Hearing Test")
        self.root.geometry("420x650")
        self.root.resizable(False, False)
        self.root.configure(bg='#f5f5f5')
        
        # Configuración de audio
        self.sample_rate = 44100
        self.duration = 1.5
        self.current_frequency = 1000
        self.current_db = 60
        self.is_playing = False
        
        # Historial
        self.test_history = []
        self.history_file = "hearing_test_history.json"
        self.load_history()
        
        # Crear interfaz
        self.create_widgets()
        
    def create_widgets(self):
        # Frame principal
        main_frame = tk.Frame(self.root, bg='white', padx=30, pady=30)
        main_frame.pack(fill=tk.BOTH, expand=True)
        
        # Título principal
        title_label = tk.Label(
            main_frame,
            text="Can you hear this sound?",
            font=("Arial", 24, "bold"),
            bg='white',
            fg='#333333'
        )
        title_label.pack(pady=(0, 5))
        
        # Subtítulo
        subtitle_label = tk.Label(
            main_frame,
            text="Now playing -",
            font=("Arial", 18),
            bg='white',
            fg='#666666'
        )
        subtitle_label.pack()
        
        # Indicador dB (verde como en la imagen)
        self.db_frame = tk.Frame(main_frame, bg='#4CAF50', height=50, width=200)
        self.db_frame.pack(pady=15)
        self.db_frame.pack_propagate(False)
        
        self.db_label = tk.Label(
            self.db_frame,
            text=f"{self.current_db} db",
            font=("Arial", 24, "bold"),
            bg='#4CAF50',
            fg='white'
        )
        self.db_label.pack(expand=True)
        
        # Entrada de frecuencia personalizada
        freq_frame = tk.Frame(main_frame, bg='white')
        freq_frame.pack(pady=20)
        
        freq_input_label = tk.Label(
            freq_frame,
            text="Enter frequency (Hz):",
            font=("Arial", 12),
            bg='white',
            fg='#555555'
        )
        freq_input_label.pack()
        
        # Frame para entrada y botón de set
        input_frame = tk.Frame(freq_frame, bg='white')
        input_frame.pack(pady=5)
        
        self.freq_entry = tk.Entry(
            input_frame,
            font=("Arial", 14),
            width=12,
            justify='center',
            bd=2,
            relief=tk.GROOVE
        )
        self.freq_entry.insert(0, "1000")
        self.freq_entry.pack(side=tk.LEFT, padx=(0, 10))
        
        set_button = tk.Button(
            input_frame,
            text="SET",
            font=("Arial", 10, "bold"),
            bg='#2196F3',
            fg='white',
            activebackground='#1976D2',
            width=6,
            height=1,
            command=self.set_custom_frequency
        )
        set_button.pack(side=tk.LEFT)
        
        # Mostrar frecuencia actual
        self.current_freq_label = tk.Label(
            main_frame,
            text=f"Current: {self.current_frequency} Hz",
            font=("Arial", 12, "bold"),
            bg='white',
            fg='#333333'
        )
        self.current_freq_label.pack(pady=5)
        
        # Botones de frecuencia predefinida
        buttons_frame = tk.Frame(main_frame, bg='white')
        buttons_frame.pack(pady=15)
        
        frequencies = [500, 1000, 4000]
        for freq in frequencies:
            btn = tk.Button(
                buttons_frame,
                text=f"{freq}Hz",
                font=("Arial", 14, "bold"),
                width=8,
                height=2,
                bg='#E0E0E0' if freq != 1000 else '#2196F3',
                fg='black' if freq != 1000 else 'white',
                activebackground='#BDBDBD',
                command=lambda f=freq: self.select_frequency(f)
            )
            btn.pack(side=tk.LEFT, padx=5)
            
        # Animación de onda de sonido
        self.wave_frame = tk.Frame(main_frame, bg='white', height=60)
        self.wave_frame.pack(pady=20)
        self.wave_frame.pack_propagate(False)
        
        self.wave_canvas = tk.Canvas(self.wave_frame, bg='white', highlightthickness=0)
        self.wave_canvas.pack(fill=tk.BOTH, expand=True)
        self.wave_bars = []
        self.draw_wave_animation(False)
        
        # Botón PLAY SOUND
        self.play_button = tk.Button(
            main_frame,
            text="▶ PLAY SOUND",
            font=("Arial", 16, "bold"),
            bg='#FF5722',
            fg='white',
            activebackground='#E64A19',
            width=20,
            height=2,
            command=self.play_sound
        )
        self.play_button.pack(pady=10)
        
        # Línea divisoria
        separator = tk.Frame(main_frame, height=2, bg='#EEEEEE')
        separator.pack(fill=tk.X, pady=20)
        
        # Botones de respuesta
        response_frame = tk.Frame(main_frame, bg='white')
        response_frame.pack()
        
        self.yes_button = tk.Button(
            response_frame,
            text="Yes",
            font=("Arial", 18, "bold"),
            bg='#4CAF50',
            fg='white',
            activebackground='#388E3C',
            width=8,
            height=2,
            command=lambda: self.register_response(True)
        )
        self.yes_button.pack(side=tk.LEFT, padx=10)
        
        self.no_button = tk.Button(
            response_frame,
            text="No",
            font=("Arial", 18, "bold"),
            bg='#F44336',
            fg='white',
            activebackground='#D32F2F',
            width=8,
            height=2,
            command=lambda: self.register_response(False)
        )
        self.no_button.pack(side=tk.LEFT, padx=10)
        
        # Estado
        self.status_label = tk.Label(
            main_frame,
            text="Ready to play sound",
            font=("Arial", 11),
            bg='white',
            fg='#666666',
            height=2
        )
        self.status_label.pack(pady=10)
        
        # Historial
        history_frame = tk.Frame(main_frame, bg='#F8F9FA')
        history_frame.pack(fill=tk.BOTH, expand=True, pady=(10, 0))
        
        history_title = tk.Label(
            history_frame,
            text="Test History:",
            font=("Arial", 11, "bold"),
            bg='#F8F9FA',
            fg='#555555'
        )
        history_title.pack(anchor='w', padx=5, pady=(5, 2))
        
        # Frame scrollable para historial
        history_container = tk.Frame(history_frame, bg='#F8F9FA')
        history_container.pack(fill=tk.BOTH, expand=True)
        
        # Canvas y scrollbar para historial
        canvas = tk.Canvas(history_container, bg='#F8F9FA', highlightthickness=0)
        scrollbar = tk.Scrollbar(history_container, orient="vertical", command=canvas.yview)
        self.history_scrollable_frame = tk.Frame(canvas, bg='#F8F9FA')
        
        self.history_scrollable_frame.bind(
            "<Configure>",
            lambda e: canvas.configure(scrollregion=canvas.bbox("all"))
        )
        
        canvas.create_window((0, 0), window=self.history_scrollable_frame, anchor="nw")
        canvas.configure(yscrollcommand=scrollbar.set)
        
        canvas.pack(side="left", fill="both", expand=True)
        scrollbar.pack(side="right", fill="y")
        
        # Actualizar historial
        self.update_history_display()
        
    def draw_wave_animation(self, playing):
        self.wave_canvas.delete("all")
        self.wave_bars = []
        
        width = 200
        height = 40
        bar_width = 6
        bar_spacing = 4
        num_bars = 20
        
        if playing:
            # Barras animadas
            for i in range(num_bars):
                x = (width - (num_bars * (bar_width + bar_spacing))) / 2 + i * (bar_width + bar_spacing)
                bar_height = np.random.randint(15, 40)
                
                bar = self.wave_canvas.create_rectangle(
                    x, height/2 - bar_height/2,
                    x + bar_width, height/2 + bar_height/2,
                    fill='#2196F3',
                    outline=''
                )
                self.wave_bars.append(bar)
        else:
            # Barras estáticas pequeñas
            for i in range(num_bars):
                x = (width - (num_bars * (bar_width + bar_spacing))) / 2 + i * (bar_width + bar_spacing)
                bar_height = 5
                
                bar = self.wave_canvas.create_rectangle(
                    x, height/2 - bar_height/2,
                    x + bar_width, height/2 + bar_height/2,
                    fill='#CCCCCC',
                    outline=''
                )
                self.wave_bars.append(bar)
    
    def animate_wave(self):
        if self.is_playing:
            for bar in self.wave_bars:
                bar_height = np.random.randint(15, 40)
                coords = self.wave_canvas.coords(bar)
                self.wave_canvas.coords(
                    bar,
                    coords[0], 20 - bar_height/2,
                    coords[2], 20 + bar_height/2
                )
            self.root.after(100, self.animate_wave)
    
    def set_custom_frequency(self):
        try:
            freq = int(self.freq_entry.get())
            if 20 <= freq <= 20000:
                self.current_frequency = freq
                self.current_freq_label.config(text=f"Current: {freq} Hz")
                self.status_label.config(text=f"Frequency set to {freq} Hz")
                
                # Resetear botones predefinidos
                for widget in self.root.winfo_children():
                    if isinstance(widget, tk.Frame):
                        for child in widget.winfo_children():
                            if isinstance(child, tk.Button) and "Hz" in child.cget("text"):
                                freq_val = int(child.cget("text").replace("Hz", ""))
                                if freq_val == freq:
                                    child.config(bg='#2196F3', fg='white')
                                else:
                                    child.config(bg='#E0E0E0', fg='black')
            else:
                messagebox.showwarning("Invalid Frequency", "Please enter a frequency between 20 and 20000 Hz")
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid number")
    
    def select_frequency(self, frequency):
        self.current_frequency = frequency
        self.freq_entry.delete(0, tk.END)
        self.freq_entry.insert(0, str(frequency))
        self.current_freq_label.config(text=f"Current: {frequency} Hz")
        
        # Actualizar colores de botones
        for widget in self.root.winfo_children():
            if isinstance(widget, tk.Frame):
                for child in widget.winfo_children():
                    if isinstance(child, tk.Button) and "Hz" in child.cget("text"):
                        freq_val = int(child.cget("text").replace("Hz", ""))
                        if freq_val == frequency:
                            child.config(bg='#2196F3', fg='white')
                        else:
                            child.config(bg='#E0E0E0', fg='black')
        
        self.status_label.config(text=f"Selected: {frequency} Hz")
    
    def generate_tone(self):
        """Genera un tono puro en la frecuencia seleccionada"""
        amplitude = 0.3 * (self.current_db / 80)
        
        t = np.linspace(0, self.duration, int(self.sample_rate * self.duration), False)
        tone = amplitude * np.sin(2 * np.pi * self.current_frequency * t)
        
        # Fade in/out
        fade_samples = int(self.sample_rate * 0.05)
        fade_in = np.linspace(0, 1, fade_samples)
        fade_out = np.linspace(1, 0, fade_samples)
        
        tone[:fade_samples] *= fade_in
        tone[-fade_samples:] *= fade_out
        
        return tone
    
    def play_sound(self):
        if self.is_playing:
            return
        
        # Validar frecuencia
        try:
            freq = int(self.freq_entry.get())
            if not (20 <= freq <= 20000):
                messagebox.showwarning("Invalid Frequency", "Frequency must be between 20 and 20000 Hz")
                return
            self.current_frequency = freq
        except ValueError:
            messagebox.showwarning("Invalid Input", "Please enter a valid frequency")
            return
        
        self.is_playing = True
        self.play_button.config(state=tk.DISABLED, text="⏸ PLAYING...")
        self.status_label.config(text=f"Playing: {self.current_frequency} Hz at {self.current_db} dB")
        
        # Animar onda
        self.draw_wave_animation(True)
        self.animate_wave()
        
        # Reproducir en hilo separado
        thread = threading.Thread(target=self._play_sound_thread)
        thread.daemon = True
        thread.start()
    
    def _play_sound_thread(self):
        try:
            tone = self.generate_tone()
            sd.play(tone, self.sample_rate)
            sd.wait()
        except Exception as e:
            print(f"Error playing sound: {e}")
        
        # Restaurar UI
        self.root.after(0, self.reset_play_button)
    
    def reset_play_button(self):
        self.is_playing = False
        self.play_button.config(state=tk.NORMAL, text="▶ PLAY SOUND")
        self.status_label.config(text="Ready to play sound")
        self.draw_wave_animation(False)
    
    def register_response(self, heard):
        result = {
            'frequency': self.current_frequency,
            'db': self.current_db,
            'heard': heard,
            'timestamp': datetime.now().strftime("%H:%M:%S"),
            'date': datetime.now().strftime("%Y-%m-%d")
        }
        
        self.test_history.append(result)
        self.save_history()
        self.update_history_display()
        
        response_text = "YES" if heard else "NO"
        self.status_label.config(text=f"Response: {response_text} for {self.current_frequency} Hz")
        
        # Feedback visual
        if heard:
            self.db_frame.config(bg='#4CAF50')
            self.db_label.config(bg='#4CAF50')
        else:
            self.db_frame.config(bg='#F44336')
            self.db_label.config(bg='#F44336')
        
        # Restaurar color después de 2 segundos
        self.root.after(2000, lambda: self.db_frame.config(bg='#4CAF50'))
        self.root.after(2000, lambda: self.db_label.config(bg='#4CAF50'))
    
    def update_history_display(self):
        # Limpiar frame de historial
        for widget in self.history_scrollable_frame.winfo_children():
            widget.destroy()
        
        if not self.test_history:
            no_history = tk.Label(
                self.history_scrollable_frame,
                text="No tests yet. Play a sound and respond.",
                font=("Arial", 10),
                bg='#F8F9FA',
                fg='#999999'
            )
            no_history.pack(pady=10)
            return
        
        # Mostrar últimos 10 resultados
        recent_history = self.test_history[-10:][::-1]
        
        for result in recent_history:
            history_item = tk.Frame(self.history_scrollable_frame, bg='#F8F9FA')
            history_item.pack(fill=tk.X, pady=2)
            
            icon = "✅" if result['heard'] else "❌"
            text = f"{icon} {result['frequency']} Hz at {result['db']} dB - {result['timestamp']}"
            
            label = tk.Label(
                history_item,
                text=text,
                font=("Arial", 10),
                bg='#F8F9FA',
                fg='#666666',
                anchor='w'
            )
            label.pack(fill=tk.X)
    
    def save_history(self):
        try:
            with open(self.history_file, 'w') as f:
                json.dump(self.test_history, f, indent=2)
        except Exception as e:
            print(f"Error saving history: {e}")
    
    def load_history(self):
        if os.path.exists(self.history_file):
            try:
                with open(self.history_file, 'r') as f:
                    self.test_history = json.load(f)
            except Exception as e:
                print(f"Error loading history: {e}")
                self.test_history = []
    
    def on_closing(self):
        self.save_history()
        self.root.destroy()

def main():
    try:
        # Verificar dependencias
        import sounddevice as sd
        print("SoundDevice is ready. Starting application...")
    except ImportError:
        print("Installing required packages...")
        import subprocess
        import sys
        
        try:
            subprocess.check_call([sys.executable, "-m", "pip", "install", "sounddevice", "numpy"])
            print("Packages installed successfully!")
        except:
            print("Failed to install packages. Please run: pip install sounddevice numpy")
            return
    
    root = tk.Tk()
    app = HearingTestApp(root)
    root.protocol("WM_DELETE_WINDOW", app.on_closing)
    root.mainloop()

if __name__ == "__main__":
    main()