package edu.buaa.service.messaging;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface NotificationInChannel {

    String CHANNEL = "notificationToGateway";

    @Input(CHANNEL)
    SubscribableChannel subscribableChannel();
}
