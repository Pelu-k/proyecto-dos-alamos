# Centro Médico Dos Alamos

Proyecto semestral para la clase de gestión ágil de proyectos

## Integrantes

* [Ricardo Benites](https://github.com/dezk123)
* [Matías Chacana](https://github.com/matiaszntc)
* [Sebastián Lara](https://github.com/Pelu-k)
* Ignacio Soto
* Pablo Verdugo
* Lisandro Zúñiga

## Caso

El Centro Médico “Dos Álamos”, comenzó como una empresa familiar, que principalmente, sevdedicaban a facilitar espacios totalmente implementados en su edificio a médicos generales, y devespecialidad en los cuales podían desempeñar su labor en forma independiente (auto gestionados),vcon el tiempo se han incorporado otros servicios como kinesiología, oftalmología y otorrinolaringología que, por su naturaleza, necesitan de espacios con implementación particular.

Con el tiempo, los dueños de “Dos Álamos” han agregado un nuevo servicio a los médicos mediante una secretaria que atiende las solicitudes de hora para cada uno de los médicos del centro, y organiza toda la documentación relativa a las atenciones y pagos, recauda dichos pagos y rinde a fin de mes lo recaudado por cada médico.

Debido al crecimiento del centro, al aumento del número de especialidades y médicos y al aumento de sucursales; el control de toda la información se ha hecho compleja, esto se ve aumentado debido a los mecanismos manuales de asignación de horas, recepción de pagos y rendición de cuentas.

Dicha administración provoca retrasos y errores en la rendición de pagos a los médicos y en el cálculo de comisiones para los dueños del centro (las cifras calculadas por los médicos, difieren de lo que indica la secretaria).

En forma adicional, el mecanismo de asignación de horas ocupa mucho tiempo administrativo, lo que provoca problemas y retrasos en las otras tareas que se deben desarrollar en el día a día del centro médico.

## Programas utilizados

* Visual Studio Code
* NodeJS 12.14.1
* Git
* Postman

## Dependencias

* express
* bcrypt
* @hapi/joi
* dotenv
* jsonwebtoken
* mongoose
* body-parser
* ejs

## Dependencias de desarrollo

* nodemon

## Requerimientos

1. Se creará un sistema web, que permita administrar la agenda de los médicos, en este se indicarán los días y  horas disponibles para atenciones médicas. Esta agenda será propia de cada médico, es decir, será generada  en base a la disponibilidad particular de cada uno. 
2. Se creará dentro del sistema un módulo de recaudación que permita a la secretaria ingresar lo recaudado por  cada atención realizada. 
3. Se crearán informes de recaudación por cada médico y general. 
4. El sistema emitirá los comprobantes para pago de comisiones individualizadas para cada  médico del centro. 
5. Se incorporará un módulo para la toma de horas de atención 
6. Los médicos contarán con un módulo que les permita ver a los pacientes en espera, un  paciente se considera en espera cuando tiene hora y pagó la atención. 

## Logica del negocio

El centro médico funciona de lunes a viernes entre las 09.00 a las 20.00 hrs. Y los días sábado entre las 09.00 y las 14.00 hrs.

La secretaria en base a la información proporcionada por los médicos, genera la agenda de éstos cada tres meses. En la agenda se indican los días y horas de atención para cada profesional.

La secretaria del centro recibe solicitudes de horas médicas por vía telefónica y asigna las horas disponibles en base a la agenda de cada médico, la cual administra en planillas Excel. Una vez que llega el paciente, la secretaria registra la atención. Este último es un evento importante debido a que los ingresos percibidos por parte de los dueños corresponden a un porcentaje del monto de la atención. A final de mes se le genera una factura a cada médico en donde se le cobran comisiones adeudadas. Junto a la factura se entrega un detalle de las atenciones realizadas.

La secretaria cumple la función de recaudadora, recibiendo el dinero y luego rindiendo a cada médico y a fin de mes a los dueños del centro.