package com.mycv.services;

import org.springframework.stereotype.Service;
import java.util.HashMap;
import java.util.Map;

@Service
public class ChatbotService {
    private final Map<String, String> responses = new HashMap<>();

    public ChatbotService() {
        responses.put("what is your name", "My name is Ciprian.");
        responses.put("what is your job", "I am a software developer.");
        responses.put("what are your skills", "I have experience in Java, Spring Boot, HTML, CSS, and JavaScript.");
        responses.put("tell me a fun fact", "I love playing cs2 in my free time!");
    }

    public String getResponse(String question) {
        return responses.getOrDefault(question.toLowerCase(), "I don't understand that question.");
    }
}
