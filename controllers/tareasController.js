const Proyectos = require('../models/Proyectos');
const Tareas = require('../models/Tareas');

exports.agregarTarea = async (req,res,next) =>{
    // Obtenemos el Proyecto actual
    const proyecto = await Proyectos.findOne({where: {url: req.params.url}});
    console.log(proyecto);
    console.log(req.body);
    // Leer el valor del Input
    const {tarea} = req.body;
    // estado 0 = Incompleto y ID de Proyecto
    const estado = 0;// Al añadir x defec incompleta
    const proyectoId = proyecto.id;

    // Insertar en la DB.Los datos en el mismo orden que la tabla de la DB(tareas)
    const resultado = await Tareas.create({ tarea, estado, proyectoId});

    if(!resultado){// Sí no hay resultado continua con lo siguiente
        return next();
    }
    // Redireccionar
    res.redirect(`/proyectos/${req.params.url}`);
}