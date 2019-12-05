package edu.buaa.service.messaging;

import edu.buaa.domain.messaging.TargetNotification;
import edu.buaa.service.messaging.channel.SynchronizeTargetChannel;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.stereotype.Service;

@Service
public class UpdateTargetNotificationConsumer {
    private final Logger log = LoggerFactory.getLogger(UpdateTargetNotificationConsumer.class);

    @StreamListener(SynchronizeTargetChannel.CHANNEL)
    public void listen(TargetNotification targetNotification) {
        log.debug("listen msg from edge: {}", targetNotification.getLongitude());
    }

}
