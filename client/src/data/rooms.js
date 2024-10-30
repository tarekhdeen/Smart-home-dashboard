const rooms = {
    living_room: {
        id: 'living_room',
        name: 'Living Room',
        deviceIds: ['light1', 'thermostat1', 'blind1'],
    },
    kitchen: {
        id: 'kitchen',
        name: 'Kitchen',
        deviceIds: ['light2'],
    },
    bedroom: {
        id: 'bedroom',
        name: 'Bedroom',
        deviceIds: ['light3', 'thermostat2', 'blind2'],
    },
    bathroom: {
        id: 'bathroom',
        name: 'Bathroom',
        deviceIds: ['light4'],
    },
    front_door: {
        id: 'front_door',
        name: 'Front Door',
        deviceIds: ['doorLock1', 'camera1'],
    },
    garage_door: {
        id: 'garage_door',
        name: 'Garage Door',
        deviceIds: ['doorLock2', 'camera2'],
    }
};

export default rooms;