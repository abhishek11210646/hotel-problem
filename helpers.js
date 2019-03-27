module.exports = {
    resolveQuery: (queryTerms) => {
        const query = { 'floor': -1, 'sub_corridor': -1 };
        for (let i = 0; i < queryTerms.length; i++) {
            const q = queryTerms[i].split('=');
            query[q[0]] ? query[[q[0]]] = q[1] : '';
        }
        return query
    },
    // socket can be used to update dashboard in reatime
    generateReport: () => {
        console.log("*********************Report Start****************************\n");
        const floors = global.myHotel.floors;
        for (let floor = 0; floor < floors.length; floor++) {
            console.log(`                   Floor ${floor + 1}                 \n`);
            console.log(`Power Consuption: ${floors[floor].powerConsumption} units / ${floors[floor].allowedPowerConsumption} units\n`);
            const corridors = floors[floor].corridors;
            for (let corridor = 0; corridor < corridors.length; corridor++) {
                console.log(`Main corridor ${corridor + 1} Light  ${corridor + 1}: ${corridors[corridor].equipments['light'].on ? 'ON' : 'OFF'} AC : ${corridors[corridor].equipments['AC'].on ? 'ON' : 'OFF'}\n`);
            }
            const subCorridors = floors[floor].subCorridors;
            for (let sub_corridor = 0; sub_corridor < subCorridors.length; sub_corridor++) {
                console.log(`Sub corridor  ${sub_corridor + 1} Light  ${sub_corridor + 1}: ${subCorridors[sub_corridor].equipments['light'].on ? 'ON' : 'OFF'} AC : ${subCorridors[sub_corridor].equipments['AC'].on ? 'ON' : 'OFF'}\n`);
            }
        }
        console.log("*********************Report End****************************\n");
    }
}