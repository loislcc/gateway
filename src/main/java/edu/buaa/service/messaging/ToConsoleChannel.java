package edu.buaa.service.messaging;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface ToConsoleChannel {
    String CHANNEL = "ToConsoleChannel";

    @Input(CHANNEL)
    SubscribableChannel subscribableChannel();
}
