# L'Albufera Miramar — web

Web nueva del restaurante, hecha desde cero (sin reutilizar el proyecto anterior).
Una sola página: portada, la casa, menú del día, carta completa, reseñas, visita y galería.

## Cómo verla

Abrir `index.html`. Para que carguen las fuentes y no haya restricciones del navegador,
servirla en local:

```
python -m http.server 8099
```

y abrir http://127.0.0.1:8099/

## Estructura

```
index.html            todo el contenido
css/style.css         sistema visual (5 tamaños, 1 tinta, papel arena)
js/app.js             foto que cambia con la sección, filtro de la carta, apariciones
assets/fonts/         Boska (display y texto) + Jost (logotipo), autoalojadas
assets/img/           fotos del restaurante, logotipo y cenefas grabadas
assets/carta-lalbufera.pdf   carta impresa original
DESIGN.md             dirección de arte y decisiones
```

## Datos que faltan antes de publicar

- Dominio y correo de contacto.
- Aviso legal: razón social, NIF y titular.
- Horario: confirmar cierre (Facebook dice 23:00; Google marca 18:30 en noviembre).
  La web publica «desde las 12:00» y avisa de confirmar cenas.
- Precio de las tellinas: la carta impresa pone `s/m`.
- Confirmar precios del menú del día (22 € / 26 €) y de la carta vigente.
- Fotos: las de Instagram están a 640 px. Con originales se pueden usar más grandes.

Fotografías: Instagram del restaurante (@lalbuferamiramar).
Ilustraciones y logotipo: carta impresa del restaurante.
