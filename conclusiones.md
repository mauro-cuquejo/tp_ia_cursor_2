Pude observar que el comportamiento es levemente distinto que el de copilot, en algunos casos para mejor, en otros, no tanto.

Me llamó la atención el consumo de tokens de algunos prompts. Estuve bastante atento al mismo, para evitar posibles cargos en mi tarjeta y en algunos casos, de forma involuntaria, generaba prompts que llegaron a consumir alrededor de 1.600.000 tokens. Es probable que ajustando correctamente el contexto, se puedan evitar estos consumos excesivos, pero me llamó la atención que tiende a hacer mucho más que lo que se le solicita, al utilizarlo por defecto.

Por momentos, tuve conflictos en las refactorizaciones, tocando código completamente funcional (sobre todo a nivel de estilos).

En cuanto a utilidades que encontré prácticas, destaco el encolamiento de prompts, aunque se extraña la posibilidad de reacomodar los mensajes encolados.
Igualmente, utilizar esta funcionalidad, afecta un poco el comportamiento de la vista de revisión de los cambios realizados por la IA. Es decir, si por ejemplo se tocara el archivo A, aparecería un cambio a revisar. Normalmente, uno revisaría ese cambio y lo aceptaría o rechazaría. El tema es cuando un mensaje encolado vuelve a tocar dicho archivo. Se genera otro item a revisar, sin desaparecer el primero. Si ambos cambios afectan al mismo código, no se qué sentido tiene aceptar el primero de los cambios, que quedó desfasado. Tampoco se qué pasaría si se rechaza el primer cambio y se acepta el segundo.

Fuera de estos detalles, el resultado obtenido es bastante bueno, más allá de algunas cuestiones que dejé, como los bordes de los mensajes de validación de campos non-null, para no seguir iterando en cambios que no hacen al propósito de la actividad. Pero me resultó muy práctica la herramienta.