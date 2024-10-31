import { useState, useRef, useEffect } from 'react';

const useDeviceNotifications = (devices) => {
  const [notificationsEnabled, setNotificationsEnabled] = useState(false);
  const previousDeviceStates = useRef({});

  const requestNotificationPermission = async () => {
    try {
      const permission = await Notification.requestPermission();
      setNotificationsEnabled(permission === 'granted');
      return permission === 'granted';
    } catch (error) {
      console.error('Error requesting notification permission:', error);
      return false;
    }
  };

  const sendNotification = (title, body) => {
    if (notificationsEnabled) {
      new Notification(title, {
        body,
        icon: '/favicon.ico'
      });
    }
  };

  useEffect(() => {
    Object.entries(devices).forEach(([deviceId, device]) => {
      const prevDevice = previousDeviceStates.current[deviceId];
      
      if (prevDevice) {
        // Check for status changes
        if (prevDevice.status !== device.status) {
          sendNotification(
            'Device Status Change',
            `${device.name} is now ${device.status}`
          );
        }

        // Check for unusual power activity
        if (device.power && prevDevice.power) {
          const powerDiff = device.power - prevDevice.power;
          if (Math.abs(powerDiff) > 100) {
            sendNotification(
              'Unusual Power Activity',
              `${device.name} showed a sudden ${powerDiff > 0 ? 'increase' : 'decrease'} in power consumption`
            );
          }
        }
      }
    });

    previousDeviceStates.current = { ...devices };
  }, [devices, notificationsEnabled]);

  return {
    notificationsEnabled,
    requestNotificationPermission,
    sendNotification
  };
};

export default useDeviceNotifications;