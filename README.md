# Hotel Problem

> Management wants to optimise
the usage of electricity consumption and also ensure that
there is no inconvenience caused to the guests and staff. So, it has
installed Motion Sensors at appropriate places and have
approached you to program a Controller which takes inputs from
these sensors and controls various equipments

### The way the hotel equipments are organised and the requirements for the Controller are listed below

● A Hotel can have multiple floors.
 
● Each Floor can have multiple main corridors and sub corridors
  
● Both main corridor and sub corridor have one light each.

● Both main and sub corridor lights consume 5 units of power when ON.

● Both main and sub corridor have independently controllable ACs.

● Both main and sub corridor ACs consume 10 units of power when ON.

● If there is **no movement** in particular sub corridors then **turn off light and turn on AC** for that sub corridor.

● If there is **movement** in particular sub corridors then **turn on light and turn off AC** for that sub corridor.

● Allowed Power Consumption (15 * Number of main corridors + 10 * Number of Sub Corridors) units per floor.
If  it is exceeding then **turn off AC of Sub Corridors**.

#### Take initial inputs

> Hotel initialization

     Number of Floors: 2

     Main Corridors per floor: 4

     Sub Corridors per floor: 2
     
> External inputs from sensor
******************************************************************************************************************************

### Start server

    node index.js
  
 ![Node Server](https://github.com/abhi11210646/hotel-problem/blob/master/assets/initialize.PNG)
  
    external inputs from sensors
  
 ![External Input from sensors](https://github.com/abhi11210646/hotel-problem/blob/master/assets/sensor_data_reciever.PNG)
  
  



