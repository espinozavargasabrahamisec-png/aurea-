// ============================================
// VARIABLES GLOBALES PARA EL TEST DE AUDICIÓN
// ============================================
let audioContext;
let oscillator;
let gainNode;
let isPlaying = false;
let currentFrequency = 1000;
let currentDb = 60;
let testHistory = [];

// ============================================
// FUNCIONES DEL TEST DE AUDICIÓN CIRCULAR
// ============================================

// Inicializar Audio Context
function initAudioContext() {
    if (!audioContext) {
        try {
            audioContext = new (window.AudioContext || window.webkitAudioContext)();
            console.log('AudioContext inicializado correctamente');
        } catch (e) {
            console.error('Error al inicializar AudioContext:', e);
            showError('Tu navegador no soporta la reproducción de audio. Usa Chrome, Firefox o Edge.');
            return false;
        }
    }
    return true;
}

// Generar y reproducir sonido
function playSound() {
    if (isPlaying) {
        stopSound();
        return;
    }
    
    if (!initAudioContext()) return;
    
    // Crear oscilador y nodo de ganancia
    oscillator = audioContext.createOscillator();
    gainNode = audioContext.createGain();
    
    // Configurar frecuencia
    oscillator.frequency.value = currentFrequency;
    oscillator.type = 'sine'; // Tonos puros
    
    // Configurar volumen basado en dB (aproximación)
    const volumePercent = currentDb / 80;
    const amplitude = Math.min(0.7, volumePercent * 0.7); // Aumentado para mejor audición
    
    // Configurar fade in/out suave
    const currentTime = audioContext.currentTime;
    const duration = 1.5; // 1.5 segundos de duración
    const fadeTime = 0.1; // 0.1 segundos para fade in/out
    
    // Configurar envolvente de volumen
    gainNode.gain.setValueAtTime(0, currentTime);
    gainNode.gain.linearRampToValueAtTime(amplitude, currentTime + fadeTime);
    gainNode.gain.setValueAtTime(amplitude, currentTime + duration - fadeTime);
    gainNode.gain.linearRampToValueAtTime(0, currentTime + duration);
    
    // Conectar nodos
    oscillator.connect(gainNode);
    gainNode.connect(audioContext.destination);
    
    // Iniciar oscilador
    oscillator.start(currentTime);
    oscillator.stop(currentTime + duration);
    
    // Actualizar UI
    isPlaying = true;
    updateUIForPlaying();
    
    // Restaurar UI después de la duración
    setTimeout(() => {
        isPlaying = false;
        updateUIForStopped();
    }, duration * 1000);
}

// Detener sonido
function stopSound() {
    if (oscillator && isPlaying) {
        try {
            const currentTime = audioContext.currentTime;
            gainNode.gain.cancelScheduledValues(currentTime);
            gainNode.gain.setValueAtTime(gainNode.gain.value, currentTime);
            gainNode.gain.linearRampToValueAtTime(0, currentTime + 0.05);
            
            setTimeout(() => {
                oscillator.stop();
                oscillator.disconnect();
                gainNode.disconnect();
            }, 50);
        } catch (e) {
            console.log('Audio ya detenido');
        }
    }
    isPlaying = false;
    updateUIForStopped();
}

// Actualizar UI durante reproducción
function updateUIForPlaying() {
    const playButton = document.getElementById('playSoundBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    const soundVisualizer = document.getElementById('soundVisualizer');
    
    if (playButton) {
        playButton.disabled = true;
        playButton.innerHTML = '<i class="fas fa-stop"></i><span class="btn-text">DETENER SONIDO</span>';
    }
    
    if (statusIndicator) {
        statusIndicator.innerHTML = `<i class="fas fa-volume-up"></i><span>Reproduciendo: ${currentFrequency} Hz a ${currentDb} dB</span>`;
    }
    
    if (soundVisualizer) {
        soundVisualizer.classList.add('playing');
    }
    
    // Activar animación de las barras de onda
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach(bar => {
        bar.style.animationPlayState = 'running';
    });
}

// Actualizar UI cuando se detiene
function updateUIForStopped() {
    const playButton = document.getElementById('playSoundBtn');
    const statusIndicator = document.getElementById('statusIndicator');
    const soundVisualizer = document.getElementById('soundVisualizer');
    
    if (playButton) {
        playButton.disabled = false;
        playButton.innerHTML = '<i class="fas fa-play"></i><span class="btn-text">REPRODUCIR SONIDO</span>';
    }
    
    if (statusIndicator) {
        statusIndicator.innerHTML = `<i class="fas fa-headphones"></i><span>Listo para reproducir sonido</span>`;
    }
    
    if (soundVisualizer) {
        soundVisualizer.classList.remove('playing');
    }
    
    // Pausar animación de las barras de onda
    const waveBars = document.querySelectorAll('.wave-bar');
    waveBars.forEach(bar => {
        bar.style.animationPlayState = 'paused';
    });
}

// Actualizar frecuencia
function updateFrequency(freq) {
    // Validar rango
    if (isNaN(freq) || freq < 20 || freq > 20000) {
        showError('Por favor ingresa una frecuencia válida entre 20 y 20000 Hz');
        return false;
    }
    
    currentFrequency = freq;
    
    // Actualizar displays
    const frequencyCircleDisplay = document.getElementById('frequencyCircleDisplay');
    const frequencyInput = document.getElementById('frequencyInput');
    const frequencySlider = document.getElementById('frequencySlider');
    const dbValue = document.getElementById('dbValue');
    
    if (frequencyCircleDisplay) {
        frequencyCircleDisplay.textContent = `${currentFrequency} Hz`;
    }
    
    if (frequencyInput) {
        frequencyInput.value = currentFrequency;
    }
    
    if (frequencySlider) {
        frequencySlider.value = currentFrequency;
    }
    
    // Actualizar botones circulares
    document.querySelectorAll('.circle-freq-btn').forEach(btn => {
        btn.classList.remove('active');
        if (parseInt(btn.dataset.freq) === currentFrequency) {
            btn.classList.add('active');
        }
    });
    
    // Actualizar progreso del círculo (simulado)
    const progressRing = document.querySelector('.progress-ring-circle');
    if (progressRing) {
        // Mapear frecuencia a progreso (20-20000 Hz a 0-628)
        const progress = ((currentFrequency - 20) / (20000 - 20)) * 628;
        progressRing.style.strokeDashoffset = 628 - progress;
    }
    
    return true;
}

// Actualizar volumen (dB)
function updateVolume(db) {
    currentDb = Math.max(0, Math.min(80, db));
    
    const dbValue = document.getElementById('dbValue');
    if (dbValue) {
        dbValue.textContent = currentDb;
    }
}

// Registrar respuesta del test de audición
function registerResponse(canHear) {
    const result = {
        frequency: currentFrequency,
        db: currentDb,
        canHear: canHear,
        timestamp: new Date().toLocaleTimeString()
    };
    
    testHistory.push(result);
    updateHistoryDisplay();
    
    // Actualizar estado
    const statusIndicator = document.getElementById('statusIndicator');
    if (statusIndicator) {
        const responseText = canHear ? 'SÍ' : 'NO';
        statusIndicator.innerHTML = `<i class="fas fa-${canHear ? 'check' : 'times'}-circle"></i><span>Respuesta: ${responseText} para ${currentFrequency} Hz a ${currentDb} dB</span>`;
    }
}

// Actualizar historial del test
function updateHistoryDisplay() {
    const historyList = document.getElementById('historyList');
    if (!historyList) return;
    
    if (testHistory.length === 0) {
        historyList.innerHTML = `
            <div class="history-item-placeholder">
                <i class="fas fa-music"></i>
                <p>Realiza tu primera prueba de audición</p>
            </div>
        `;
        return;
    }
    
    // Mostrar solo los últimos 5 resultados
    const recentResults = testHistory.slice(-5).reverse();
    historyList.innerHTML = '';
    
    recentResults.forEach(result => {
        const historyItem = document.createElement('div');
        historyItem.className = `history-item ${result.canHear ? 'yes' : 'no'}`;
        
        historyItem.innerHTML = `
            <div class="history-icon">
                <i class="fas fa-${result.canHear ? 'check' : 'times'}-circle"></i>
            </div>
            <div class="history-content">
                <div class="history-frequency">${result.frequency} Hz a ${result.db} dB</div>
                <div class="history-details">
                    <span class="history-response">${result.canHear ? 'Sí escuchó' : 'No escuchó'}</span>
                    <span class="history-time">${result.timestamp}</span>
                </div>
            </div>
        `;
        
        historyList.appendChild(historyItem);
    });
}

// Mostrar error
function showError(message) {
    const statusIndicator = document.getElementById('statusIndicator');
    if (statusIndicator) {
        statusIndicator.innerHTML = `<i class="fas fa-exclamation-triangle"></i><span>${message}</span>`;
    }
    
    // También mostrar alerta
    Swal.fire({
        icon: 'error',
        title: 'Error',
        text: message,
        confirmButtonColor: '#8B2C2C'
    });
}

// ============================================
// FUNCIONES DE LA ENCUESTA
// ============================================

// Función para manejar la selección de "¿Escuchas bien?"
function handleSelection() {
    const hearWellSelect = document.getElementById('hearWell');
    const followUpDiv = document.getElementById('followUp');
    const detailsInput = document.getElementById('details');
    
    if (!hearWellSelect || !followUpDiv) return;
    
    const hearWell = hearWellSelect.value;
    
    if (hearWell === 'no') {
        followUpDiv.classList.remove('hidden');
        // Hacer el campo de detalles requerido si es visible
        if (detailsInput) {
            detailsInput.required = true;
            detailsInput.setAttribute('aria-required', 'true');
        }
    } else {
        followUpDiv.classList.add('hidden');
        // Quitar el requerido si está oculto
        if (detailsInput) {
            detailsInput.required = false;
            detailsInput.removeAttribute('aria-required');
        }
    }
}

// Función para analizar resultados del test de audición
function analizarResultadosTest() {
    if (testHistory.length === 0) {
        return { tieneDatos: false, mensaje: 'No se realizaron pruebas de audición' };
    }
    
    // Contar respuestas "Sí" y "No"
    let siEscucho = 0;
    let noEscucho = 0;
    let frecuenciaMaximaEscuchada = 0;
    let frecuenciaMinimaNoEscuchada = Infinity;
    
    testHistory.forEach(result => {
        if (result.canHear) {
            siEscucho++;
            if (result.frequency > frecuenciaMaximaEscuchada) {
                frecuenciaMaximaEscuchada = result.frequency;
            }
        } else {
            noEscucho++;
            if (result.frequency < frecuenciaMinimaNoEscuchada) {
                frecuenciaMinimaNoEscuchada = result.frequency;
            }
        }
    });
    
    return {
        tieneDatos: true,
        totalPruebas: testHistory.length,
        siEscucho,
        noEscucho,
        frecuenciaMaximaEscuchada,
        frecuenciaMinimaNoEscuchada: frecuenciaMinimaNoEscuchada === Infinity ? null : frecuenciaMinimaNoEscuchada,
        porcentajeEscucha: (siEscucho / testHistory.length) * 100
    };
}

// Función para determinar nivel de alerta
function determinarNivelAlerta(respuestas) {
    let puntos = 0;
    let alertas = [];
    
    // 1. Análisis de calidad de audio
    if (respuestas.audioQuality === 'Mala' || respuestas.audioQuality === 'Regular') {
        puntos += 2;
        alertas.push('Reporta problemas para escuchar el audio');
    }
    
    // 2. Análisis de frecuencia escuchada
    if (respuestas.frecuenciaEscuchada) {
        if (respuestas.frecuenciaEscuchada === '1000-3000') {
            puntos += 3;
            alertas.push('Frecuencia máxima escuchada baja (1000-3000 Hz)');
        } else if (respuestas.frecuenciaEscuchada === '3000-6000') {
            puntos += 1;
        } else if (respuestas.frecuenciaEscuchada === '6000-9000') {
            puntos += 0;
        } else if (respuestas.frecuenciaEscuchada === '10000+') {
            puntos -= 1; // Bonus por buena audición
        }
    }
    
    // 3. Análisis de edad desde que dejó de escuchar
    if (respuestas.ageHearingIssues && respuestas.ageHearingIssues !== '') {
        const edad = parseInt(respuestas.ageHearingIssues);
        if (edad < 50) {
            puntos += 2;
            alertas.push(`Dejó de escuchar a temprana edad (${edad} años)`);
        }
    }
    
    // 4. Análisis de antecedentes familiares
    if (respuestas.hearWell === 'yes') {
        puntos += 2;
        alertas.push('Tiene antecedentes familiares de problemas auditivos');
    }
    
    // 5. Análisis de consulta profesional
    if (respuestas.professionalConsulted === 'No') {
        puntos += 1;
        alertas.push('No ha consultado a un profesional de la salud auditiva');
    }
    
    // 6. Análisis de conocimiento de audífonos medicados
    if (respuestas.knowsMedicalHearingAids === 'No') {
        puntos += 1;
        alertas.push('No conoce los audífonos medicados (puede beneficiarse de información)');
    }
    
    // 7. Análisis de edad cuando notó problemas
    if (respuestas.ageNoticedProblems && respuestas.ageNoticedProblems !== '') {
        const edadProblemas = parseInt(respuestas.ageNoticedProblems);
        if (edadProblemas < 40) {
            puntos += 2;
            alertas.push(`Notó problemas de audición a temprana edad (${edadProblemas} años)`);
        }
    }
    
    // 8. Análisis de resultados del test
    if (respuestas.testResults.tieneDatos) {
        if (respuestas.testResults.porcentajeEscucha < 50) {
            puntos += 3;
            alertas.push(`Bajo rendimiento en test de audición (${respuestas.testResults.porcentajeEscucha.toFixed(0)}% de aciertos)`);
        }
        
        if (respuestas.testResults.frecuenciaMaximaEscuchada < 4000) {
            puntos += 2;
            alertas.push(`Frecuencia máxima escuchada en test: ${respuestas.testResults.frecuenciaMaximaEscuchada} Hz`);
        }
        
        // Bonus por buen rendimiento en test
        if (respuestas.testResults.porcentajeEscucha > 80 && respuestas.testResults.frecuenciaMaximaEscuchada > 8000) {
            puntos -= 2;
        }
    }
    
    // Determinar nivel final
    let nivel = 'bajo';
    let recomendacion = '';
    
    if (puntos >= 8) {
        nivel = 'alto';
        recomendacion = 'Urgente evaluación con especialista. Recomendamos agendar una cita inmediata para una audiometría completa.';
    } else if (puntos >= 5) {
        nivel = 'medio';
        recomendacion = 'Se recomienda evaluación preventiva. Sería beneficioso realizar un chequeo auditivo profesional en los próximos meses.';
    } else if (puntos >= 3) {
        nivel = 'leve';
        recomendacion = 'Monitoreo recomendado. Realice chequeos periódicos y esté atento a cualquier cambio en su audición.';
    } else {
        nivel = 'normal';
        recomendacion = 'Audición aparentemente normal. Continúe con hábitos saludables para proteger su audición.';
    }
    
    return {
        nivel,
        puntos,
        alertas,
        recomendacion
    };
}

// Función para mostrar alerta personalizada
function mostrarAlertaPersonalizada(nivelAlerta) {
    let icono, titulo, colorBoton, mensajePrincipal;
    
    switch (nivelAlerta.nivel) {
        case 'alto':
            icono = 'error';
            titulo = '⚠️ ATENCIÓN: Evaluación Urgente Recomendada';
            colorBoton = '#dc3545';
            mensajePrincipal = 'Basado en sus respuestas, encontramos varios indicadores que sugieren la necesidad de una evaluación auditiva profesional.';
            break;
            
        case 'medio':
            icono = 'warning';
            titulo = '🔍 Evaluación Preventiva Recomendada';
            colorBoton = '#fd7e14';
            mensajePrincipal = 'Sus respuestas indican que podría beneficiarse de una evaluación auditiva preventiva.';
            break;
            
        case 'leve':
            icono = 'info';
            titulo = '📋 Monitoreo Recomendado';
            colorBoton = '#17a2b8';
            mensajePrincipal = 'Algunas de sus respuestas sugieren que sería bueno monitorear su salud auditiva regularmente.';
            break;
            
        default:
            icono = 'success';
            titulo = '✅ Resultados Favorables';
            colorBoton = '#28a745';
            mensajePrincipal = 'Según sus respuestas, su salud auditiva parece estar en buen estado.';
    }
    
    // Construir contenido HTML de la alerta
    let contenidoHTML = `
        <div style="text-align: left; padding: 10px;">
            <p style="margin-bottom: 15px; font-size: 16px;">${mensajePrincipal}</p>
            
            <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; border-left: 4px solid ${colorBoton}; margin-bottom: 20px;">
                <p style="margin: 0; font-weight: 600; color: ${colorBoton};">
                    📊 Nivel de alerta: ${nivelAlerta.nivel.toUpperCase()} (${nivelAlerta.puntos} puntos)
                </p>
                <p style="margin: 8px 0 0 0; color: #555;">${nivelAlerta.recomendacion}</p>
            </div>
    `;
    
    // Agregar alertas específicas si existen
    if (nivelAlerta.alertas.length > 0) {
        contenidoHTML += `
            <div style="margin-bottom: 20px;">
                <p style="font-weight: 600; color: #8B2C2C; margin-bottom: 10px;">📝 Factores identificados:</p>
                <ul style="margin: 0; padding-left: 20px;">
        `;
        
        nivelAlerta.alertas.forEach(alerta => {
            contenidoHTML += `<li style="margin-bottom: 5px; color: #555;">${alerta}</li>`;
        });
        
        contenidoHTML += `
                </ul>
            </div>
        `;
    }
    
    // Agregar recomendaciones de acción
    contenidoHTML += `
            <div style="margin-top: 25px; text-align: center;">
                <p style="margin-bottom: 15px; color: #555; font-size: 14px;">
                    ${nivelAlerta.nivel === 'alto' ? 
                      'Le recomendamos contactarnos para una evaluación inmediata:' : 
                      '¿Le gustaría más información o agendar una cita preventiva?'}
                </p>
                
                <div style="display: flex; flex-direction: column; gap: 10px; align-items: center;">
                    <a href="https://wa.me/59170111673?text=Hola%20Áurea%20Centro%20Auditivo%2C%20vine%20de%20su%20página%20web%20y%20quiero%20información%20sobre%20una%20evaluación%20auditiva.%20¿Podrían%20ayudarme%3F" 
                       target="_blank" 
                       rel="noopener noreferrer"
                       style="display: inline-flex; align-items: center; gap: 8px; background-color: #25D366; color: white; padding: 12px 25px; border-radius: 8px; text-decoration: none; font-weight: 600; transition: all 0.3s; width: fit-content;">
                        <i class="fab fa-whatsapp" style="font-size: 20px;"></i>
                        <span>Contactar por WhatsApp</span>
                    </a>
                </div>
            </div>
        </div>
    `;
    
    Swal.fire({
        icon: icono,
        title: titulo,
        html: contenidoHTML,
        confirmButtonText: nivelAlerta.nivel === 'alto' ? 'Entiendo, contactaré' : 'Cerrar',
        confirmButtonColor: colorBoton,
        width: '650px',
        customClass: {
            popup: 'swal2-popup-aurea'
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Limpiar todo cuando se cierra la alerta
            limpiarTodo();
        }
    });
}

// Función para limpiar todo después de enviar
function limpiarTodo() {
    // Resetear el formulario
    const surveyForm = document.getElementById('surveyForm');
    if (surveyForm) {
        surveyForm.reset();
    }
    
    // Resetear el estado del campo followUp
    handleSelection();
    
    // Limpiar historial de test
    testHistory = [];
    updateHistoryDisplay();
    
    // Restaurar frecuencia por defecto
    updateFrequency(1000);
    
    // Restaurar volumen por defecto
    updateVolume(60);
    
    // Detener cualquier sonido que esté reproduciéndose
    stopSound();
}

// Función para manejar el envío del formulario
function handleSubmit(event) {
    event.preventDefault();

    // Validar que todos los campos requeridos estén completos
    const requiredFields = document.querySelectorAll('[required]');
    let isValid = true;
    
    requiredFields.forEach(field => {
        if (!field.value.trim()) {
            isValid = false;
            field.style.borderColor = '#dc3545';
            field.style.boxShadow = '0 0 0 0.2rem rgba(220, 53, 69, 0.25)';
        } else {
            field.style.borderColor = '';
            field.style.boxShadow = '';
        }
    });

    if (!isValid) {
        Swal.fire({
            icon: 'error',
            title: 'Campos incompletos',
            text: 'Por favor, complete todos los campos requeridos.',
            confirmButtonColor: '#8B2C2C'
        });
        return;
    }

    // Obtener valores de las respuestas
    const audioQuality = document.getElementById('audioQuality').value;
    const frecuenciaEscuchada = document.querySelector('input[name="frecuencia"]:checked')?.value;
    const ageHearingIssues = document.getElementById('ageHearingIssues').value;
    const hearWell = document.getElementById('hearWell').value;
    const professionalConsulted = document.querySelector('input[name="professionalConsulted"]:checked')?.value;
    const knowsMedicalHearingAids = document.querySelector('input[name="knowsMedicalHearingAids"]:checked')?.value;
    const ageNoticedProblems = document.getElementById('ageNoticedProblems').value;
    
    // Analizar respuestas del test de audición
    const testResults = analizarResultadosTest();
    
    // Determinar nivel de alerta basado en las respuestas
    const nivelAlerta = determinarNivelAlerta({
        audioQuality,
        frecuenciaEscuchada,
        ageHearingIssues,
        hearWell,
        professionalConsulted,
        knowsMedicalHearingAids,
        ageNoticedProblems,
        testResults
    });
    
    // Mostrar alerta según el nivel determinado
    mostrarAlertaPersonalizada(nivelAlerta);
}

// ============================================
// FUNCIÓN DE INICIALIZACIÓN
// ============================================

// Función para inicializar toda la aplicación
function initializeApp() {
    console.log('Inicializando aplicación de audición...');
    
    // ========== CONFIGURACIÓN DEL TEST DE AUDICIÓN CIRCULAR ==========
    
    // Configurar botones de frecuencia circular
    document.querySelectorAll('.circle-freq-btn').forEach(button => {
        button.addEventListener('click', function() {
            const freq = parseInt(this.dataset.freq);
            if (updateFrequency(freq)) {
                stopSound(); // Detener sonido si está reproduciendo
            }
        });
    });
    
    // Configurar slider de frecuencia
    const frequencySlider = document.getElementById('frequencySlider');
    if (frequencySlider) {
        frequencySlider.addEventListener('input', function() {
            const freq = parseInt(this.value);
            updateFrequency(freq);
        });
    }
    
    // Configurar input de frecuencia
    const frequencyInput = document.getElementById('frequencyInput');
    if (frequencyInput) {
        frequencyInput.addEventListener('change', function() {
            const freq = parseInt(this.value);
            if (updateFrequency(freq)) {
                stopSound();
            }
        });
        
        frequencyInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                e.preventDefault();
                const freq = parseInt(this.value);
                if (updateFrequency(freq)) {
                    stopSound();
                    playSound();
                }
            }
        });
    }
    
    // Configurar botón de establecer frecuencia
    const setFrequencyBtn = document.getElementById('setFrequencyBtn');
    if (setFrequencyBtn) {
        setFrequencyBtn.addEventListener('click', function() {
            const freq = parseInt(frequencyInput.value);
            if (updateFrequency(freq)) {
                stopSound();
            }
        });
    }
    
    // Configurar botón de reproducción
    const playSoundBtn = document.getElementById('playSoundBtn');
    if (playSoundBtn) {
        playSoundBtn.addEventListener('click', playSound);
    }
    
    // Configurar botones de respuesta
    const hearYesBtn = document.getElementById('hearYesBtn');
    const hearNoBtn = document.getElementById('hearNoBtn');
    
    if (hearYesBtn) {
        hearYesBtn.addEventListener('click', function() {
            registerResponse(true);
        });
    }
    
    if (hearNoBtn) {
        hearNoBtn.addEventListener('click', function() {
            registerResponse(false);
        });
    }
    
    // Configurar control de volumen (simulado con doble click en el círculo dB)
    const dbValue = document.getElementById('dbValue');
    if (dbValue) {
        dbValue.addEventListener('dblclick', function() {
            const newDb = prompt('Ingresa el nivel de volumen (0-80 dB):', currentDb);
            if (newDb !== null) {
                const db = parseInt(newDb);
                if (!isNaN(db) && db >= 0 && db <= 80) {
                    updateVolume(db);
                } else {
                    showError('Por favor ingresa un valor entre 0 y 80 dB');
                }
            }
        });
    }
    
    // ========== CONFIGURACIÓN DE LA ENCUESTA ==========
    
    // Agregar evento al formulario
    const form = document.getElementById('surveyForm');
    if (form) {
        form.addEventListener('submit', handleSubmit);
    } else {
        console.error('No se encontró el formulario con id "surveyForm"');
    }
    
    // Inicializar el estado del campo followUp
    handleSelection();
    
    // Agregar evento al select de "¿Escuchas bien?"
    const hearWellSelect = document.getElementById('hearWell');
    if (hearWellSelect) {
        hearWellSelect.addEventListener('change', handleSelection);
    }
    
    // Agregar validación en tiempo real a los campos requeridos
    const requiredFields = document.querySelectorAll('[required]');
    requiredFields.forEach(field => {
        field.addEventListener('input', function() {
            if (this.value.trim()) {
                this.style.borderColor = '';
                this.style.boxShadow = '';
            }
        });
    });
    
    // ========== INICIALIZACIÓN FINAL ==========
    
    // Inicializar historial
    updateHistoryDisplay();
    
    // Inicializar el modal de Bootstrap para el mapa
    const mapaModalElement = document.getElementById('mapaModal');
    if (mapaModalElement && typeof bootstrap !== 'undefined') {
        const mapaModal = new bootstrap.Modal(mapaModalElement);
        
        // Mejorar la accesibilidad del modal
        mapaModalElement.addEventListener('shown.bs.modal', function() {
            const closeBtn = this.querySelector('.btn-close');
            if (closeBtn) {
                closeBtn.focus();
            }
        });
    }
    
    // Manejar cierre de ventana
    window.addEventListener('beforeunload', function() {
        stopSound();
    });
    
    // Inicializar audio context al primer clic (por políticas de autoplay)
    document.addEventListener('click', function initAudioOnFirstClick() {
        initAudioContext();
        document.removeEventListener('click', initAudioOnFirstClick);
    }, { once: true });
    
    // Mensaje de consola para desarrollo
    console.log('Aplicación de Test de Audición - Áurea Centro Auditivo');
    console.log('Script cargado correctamente');
}

// ============================================
// EVENTO DE CARGA DEL DOM
// ============================================

// Inicializar cuando el DOM esté listo
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeApp);
} else {
    initializeApp();
}