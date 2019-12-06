package edu.buaa.service.messaging;

import edu.buaa.domain.Notification;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.cloud.stream.annotation.EnableBinding;
import org.springframework.cloud.stream.annotation.StreamListener;
import org.springframework.messaging.simp.SimpMessageSendingOperations;
import org.springframework.stereotype.Service;


@Service
@EnableBinding()
public class NotificationConsumer {
    private final Logger log = LoggerFactory.getLogger(NotificationConsumer.class);

    private final SimpMessageSendingOperations messagingTemplate;

    public NotificationConsumer(SimpMessageSendingOperations messagingTemplate){
        this.messagingTemplate = messagingTemplate;
    }

    @StreamListener(NotificationInChannel.CHANNEL)
    public void listen(Notification msg) {
        log.debug("listen Notification from edge: {}", msg);
        messagingTemplate.convertAndSend("/topic/notification", msg);
    }
}
