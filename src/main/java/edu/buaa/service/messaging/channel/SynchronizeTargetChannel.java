package edu.buaa.service.messaging.channel;

import org.springframework.cloud.stream.annotation.Input;
import org.springframework.messaging.SubscribableChannel;

public interface SynchronizeTargetChannel {

    String CHANNEL = "SynchronizeTargetChannel";

    @Input(CHANNEL)
    SubscribableChannel subscribableChannel();
}
