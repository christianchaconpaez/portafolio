/**
 * ====================================================================
 * SCRIPT PRINCIPAL - INTERACTIVIDAD MODULAR Y FORMULARIO
 * ====================================================================
 */

document.addEventListener("DOMContentLoaded", () => {
  console.log("Módulo JS inicializado correctamente.");

  // 1. Lógica para Acordeones (Preguntas Frecuentes)
  const accordionHeaders = document.querySelectorAll(".accordion-header");
  
  accordionHeaders.forEach(header => {
    header.addEventListener("click", () => {
      const content = header.nextElementSibling;
      const isOpen = header.classList.contains("active");

      accordionHeaders.forEach(h => {
        h.classList.remove("active");
        h.nextElementSibling.style.maxHeight = "0";
      });

      if (!isOpen) {
        header.classList.add("active");
        content.style.maxHeight = content.scrollHeight + "px";
      }
    });
  });

  // 2. Lógica para Pestañas (Casos de Uso)
  const tabButtons = document.querySelectorAll(".tab-btn");
  const tabPanes = document.querySelectorAll(".tab-pane");

  tabButtons.forEach(button => {
    button.addEventListener("click", () => {
      tabButtons.forEach(btn => btn.classList.remove("active"));
      tabPanes.forEach(pane => pane.classList.remove("active"));

      button.classList.add("active");
      const targetPane = document.getElementById(button.dataset.tab);
      if (targetPane) {
        targetPane.classList.add("active");
      }
    });
  });

  // 3. Lógica del Formulario de Diagnóstico y Registro en Google Sheets
  const inputNombre = document.getElementById('campoNombre');
  const inputApellido = document.getElementById('campoApellido');
  const inputCorreo = document.getElementById('campoCorreo');
  const inputTelefono = document.getElementById('campoTelefono');
  const btnAgendar = document.getElementById('btnAgendar');
  const formulario = document.getElementById('agendarForm');

  function validarFormulario() {
      if (
          inputNombre && inputNombre.value.trim() !== '' &&
          inputApellido && inputApellido.value.trim() !== '' &&
          inputCorreo && inputCorreo.value.trim() !== '' &&
          inputTelefono && inputTelefono.value.trim() !== ''
      ) {
          btnAgendar.removeAttribute('disabled');
          btnAgendar.style.backgroundColor = '#0066ff';
          btnAgendar.style.color = '#ffffff';
          btnAgendar.style.cursor = 'pointer';
          btnAgendar.style.boxShadow = '0 4px 14px rgba(0, 102, 255, 0.4)';
      } else if (btnAgendar) {
          btnAgendar.setAttribute('disabled', 'true');
          btnAgendar.style.backgroundColor = '#334155';
          btnAgendar.style.color = '#94a3b8';
          btnAgendar.style.cursor = 'not-allowed';
          btnAgendar.style.boxShadow = 'none';
      }
  }

  if (inputNombre && inputApellido && inputCorreo && inputTelefono && btnAgendar && formulario) {
      inputNombre.addEventListener('input', validarFormulario);
      inputApellido.addEventListener('input', validarFormulario);
      inputCorreo.addEventListener('input', validarFormulario);
      inputTelefono.addEventListener('input', validarFormulario);

      btnAgendar.addEventListener('click', function(e) {
          if (!btnAgendar.hasAttribute('disabled')) {
              window.submitted = true;
              formulario.submit(); // Envía los datos al Google Sheet de manera limpia y abre Google Calendar vía iframe
          }
      });
  }
});



/* --- CONTROL DE MENÚ RESPONSIVO (MÓVIL) --- */
document.addEventListener('DOMContentLoaded', () => {
    const menuToggle = document.querySelector('.menu-toggle');
    const navLinks = document.querySelector('.nav-links');

    if (menuToggle && navLinks) {
        menuToggle.addEventListener('click', () => {
            navLinks.classList.toggle('active');
            menuToggle.classList.toggle('open');
        });

        // Cerrar el menú automáticamente al hacer clic en cualquier enlace interno
        navLinks.querySelectorAll('a').forEach(link => {
            link.addEventListener('click', () => {
                navLinks.classList.remove('active');
                menuToggle.classList.remove('open');
            });
        });
    }
});