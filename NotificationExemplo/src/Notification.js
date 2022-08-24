import PushNotification from "react-native-push-notification"

class Notification {

    // Configuração orientada pela documentação do React Native Push Notification
    // Essa configuração garante o funcionamento da biblioteca no Android e no iOS
    configure = () => {
        PushNotification.configure({
            onRegister: function (token) {
                console.log("[NotificationManager] onRegister token:", token);
            },
            onNotification: function (notification) {
                console.log("[NotificationManager] onNotification:", notification);

                // Função de processamento da notificação 
                // Chamada quando uma notificação é recebida ou aberta
                PushNotification.localNotificationSchedule({
                    //... You can use all the options from localNotifications
                    id: 2, 
                    message: "My Notification Message", // (required)
                    date: new Date(Date.now() + 5 * 1000), // in 60 secs
                    allowWhileIdle: false, // (optional) set notification to work while on doze, default: false
        
                    /* Android Only Properties */
                    repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
                    repeatType: "minute",
                    channelId: 'my-channel',
                });
            },
        })
    }

    // É aqui que nossa notificação para o Android é construida
    buildAndroidNotification = (id, title, message, data = {}, options = {}) => {
        return {
            id: id,
            channelId: 'my-channel',
            autoCancel: true,
            largeIcon: options.largeIcon || "ic_launcher",
            smallIcon: options.smallIcon || "ic_launcher",
            bigText: message || '',
            subText: title || '',
            vibrate: options.vibrate || false,
            vibration: options.vibration || 300,
            priority: options.priority || "high",
            importance: options.importance || "high",
            data: data
        }
    }

    // Fução que exibe a notificação
    showNotification = (id, title, message, data = {}, options = {}) => {
        PushNotification.localNotification({
            /* Propriedades do Android */
            ...this.buildAndroidNotification(id, title, message, data, options),

            /* Propriedades do Android e iOS */
            title: title || "",
            message: message || "",
            playSound: options.playSound || false,
            soundName: options.soundName || 'default',
            userInteraction: false,
            channelId: 'my-channel'
        })
    }

    // Função que cancela todas notiificações e limpa as que estão no centro de notificações
    cancelAllLocalNotification = () => {
        PushNotification.cancelAllLocalNotifications();
    }


    // Criação de canais
    createChannel = () => {
        PushNotification.createChannel(
            {
                channelId: "my-channel", // (required)
                channelName: "My channel", // (required)
                channelDescription: "A channel to categorise your notifications", // (optional) default: undefined.
            },
            (created) => console.log(`createChannel returned '${created}'`) // (optional) callback returns whether the channel was created, false means it already existed.
        );
    }

    buildNotificationSchedule = () => {
        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id: 2, 
            message: "My Notification Message", // (required)
            date: new Date(Date.now() + 5 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "minute",
            channelId: 'my-channel',
        });

        PushNotification.localNotificationSchedule({
            //... You can use all the options from localNotifications
            id: 3, 
            message: "My Notification Message 2", // (required)
            date: new Date(Date.now() + 10 * 1000), // in 60 secs
            allowWhileIdle: false, // (optional) set notification to work while on doze, default: false

            /* Android Only Properties */
            repeatTime: 1, // (optional) Increment of configured repeatType. Check 'Repeating Notifications' section for more info.
            repeatType: "minute",
            channelId: 'my-channel',
        });
    }

}


export const NotificationManager = new Notification;