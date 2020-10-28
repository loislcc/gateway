package edu.buaa.service.messaging;

import edu.buaa.domain.TargetNotification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.context.annotation.Lazy;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;


@Service
@EnableBinding()
public class ToConsoleConsumer {
    private final Logger log = LoggerFactory.getLogger(NotificationConsumer.class);

    @Lazy
    private final SimpMessageSendingOperations messagingTemplate;

    public ToConsoleConsumer(SimpMessageSendingOperations messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    @StreamListener(ToConsoleChannel.CHANNEL)
    public void listen(String msg) {
        log.debug("listen Notification from edge to console: {}", msg);
        messagingTemplate.convertAndSend("/topic/console", msg);
    }
}
