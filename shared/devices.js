const devices = {
  light1: {
    id: 'light1',
    name: 'Main Light',
    type: 'light',
    state: 'off',
    roomId: 'living_room'
  },
  light2: {
    id: 'light2',
    name: 'Kitchen Light',
    type: 'light',
    state: 'off',
    roomId: 'kitchen'
  },
  light3: {
    id: 'light3',
    name: 'Bedroom Light',
    type: 'light',
    state: 'off',
    roomId: 'bedroom'
  },
  light4: {
    id: 'light4',
    name: 'Bathroom Light',
    type: 'light',
    state: 'off',
    roomId: 'bathroom'
  },
  thermostat1: {
    id: 'thermostat1',
    name: 'Living Room Thermostat',
    type: 'thermostat',
    temperature: 72,
    roomId: 'living_room'
  },
  thermostat2: {
    id: 'thermostat2',
    name: 'Bedroom Thermostat',
    type: 'thermostat',
    temperature: 70,
    roomId: 'bedroom'
  },
  camera1: {
    id: 'camera1',
    name: 'Front Door Camera',
    type: 'camera',
    state: 'off',
    isRecording: false,
    streamUrl: 'rtsp://camera1.local/stream',
    resolution: '1080p',
    nightVision: true,
    roomId: 'front_door'
  },
  camera2: {
    id: 'camera2',
    name: 'Backyard Camera',
    type: 'camera',
    state: 'off',
    isRecording: false,
    streamUrl: 'rtsp://camera2.local/stream',
    resolution: '1080p',
    nightVision: true,
    roomId: 'garage_door'
  },
  doorLock1: {
    id: 'doorLock1',
    name: 'Front Door Lock',
    type: 'doorLock',
    state: 'locked',
    batteryLevel: 100,
    lastAccessTime: null,
    autoLock: true,
    autoLockDelay: 30, // seconds
    roomId: 'front_door'
  },
  doorLock2: {
    id: 'doorLock2',
    name: 'Garage Door Lock',
    type: 'doorLock',
    state: 'locked',
    batteryLevel: 100,
    lastAccessTime: null,
    autoLock: true,
    autoLockDelay: 30,
    roomId: 'garage_door'
  },
  blind1: {
    id: 'blind1',
    name: 'Living Room Blinds',
    type: 'blind',
    position: 100, // 0 is fully open, 100 is fully closed
    tiltAngle: 0,  // -90 to 90 degrees
    state: 'stopped', // moving/stopped
    roomId: 'living_room'
  },
  blind2: {
    id: 'blind2',
    name: 'Bedroom Blinds',
    type: 'blind',
    position: 100,
    tiltAngle: 0,
    state: 'stopped',
    roomId: 'bedroom'
  }

};

export default devices;