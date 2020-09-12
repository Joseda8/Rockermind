Rockermind es un sitio en que si eres un Fan puedes conocer nuevas bandas, su música y lugares en 
donde tocan. Puedes seguir sus publicaciones, reaccionar a ellas, ver sus próximos eventos y
escuchar un poco de su música. Si eres un rockero puedes hacer publicaciones, ver tus estadísticas 
de popularidad y acordar conciertos. Mientras que si eres el dueño de un local, puedes crear nuevos
eventos y contratar bandas para que toquen en ellos.


En razón de lograr un proyecto suficientemente diferente a los demás, especificamente del proyecto
4 de la red social, debo señalar que la complejidad y enfoque de Rockermind no está en el manejo de
los post. Si no más bien en el manejo de roles por usuario y la interacción entre ellos, esto 
implica un modelo de Django grande y muy relacionado entre sus clases, además de un tipo de usuario 
propio que contenga al UserDjango y del que extiendan los otros tres roles.

Además, otro aspecto importante fue la investigación en fuentes externas a las notas del curso, 
como la captación, almacenamiento, transmisión y visualización de imágenes, también el envío de
peticiones POST utilizando FETCH y resolviendo el tema del csrftoken, adicionalmente al 
almacenamiento de los enlaces de canciones, de modo que las bandas puedan copiar y pegar el link 
de la canción directamente de la barra de búsqueda del navegador. También el uso de pop-up menus
los cuales generan una interacción ágil con la página.

Finalmente creo que la página es estéticamente agradable, aspecto que fue laborioso, además cuenta 
con manejos de JavaScript interesantes como el formulario dinámico de registro y la visualización 
aleatoria y progresiva de las bandas para los Place Owner (esto implicó una comunicación entre el 
front end y el backend en razón de no enviar bandas que ya se tengan desplegadas, pero conservando 
la aleatoriedad en la visualización de las mismas). 

Adicionalmente debo señalar que cuando realicé el penúltimo proyecto, fue antes de junio, así que
yo hice la pizzería. Esto no es excusa para hacer algo similar a la red social, pero sí quiero 
recalcar que la única semejanza es la existencia de post y la acción de seguir usuarios, sin embargo
intenté innovar estas semejanza con las imágenes en los post y la distinción entre likes y loves. 
Así, la creación de eventos, notificaciones, atributos de los usuarios y la temática es totalmente
original.

En síntesis, la complejidad del proyecto radica en la información de los usuario por rol y su
interacción entre sí (incluyendo imágenes y dependencias entre sus acciones), además de los
aspectos estéticos que brindan una interacción agradable con el sitio. 