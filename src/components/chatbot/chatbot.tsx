"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/lib/utils";
import { Bot, Send, User } from "lucide-react";
import { useState } from "react";

const sampleConversation = [
    { role: 'user', message: 'Hi! I\'m interested in careers in technology.' },
    { role: 'bot', message: 'That\'s great! Technology is a booming field. Do you have any specific areas of interest, like software development, data science, or cybersecurity?' },
    { role: 'user', message: 'I think software development sounds cool.' },
    { role: 'bot', message: 'Excellent choice. To get started in software development, I recommend exploring online coding platforms like Codecademy or freeCodeCamp. Would you like me to find some beginner-friendly resources for Python, a popular starting language?' },
];

export function Chatbot() {
  const [conversation, setConversation] = useState(sampleConversation);
  const [input, setInput] = useState('');

  const handleSend = () => {
    if (input.trim()) {
        setConversation([...conversation, { role: 'user', message: input }]);
        setInput('');
        // In a real app, you would send the input to the AI and get a response.
        setTimeout(() => {
            setConversation(prev => [...prev, { role: 'bot', message: 'This is a static response for the prototype.' }]);
        }, 1000);
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button
          variant="default"
          size="icon"
          className="fixed bottom-6 right-6 h-16 w-16 rounded-full shadow-lg z-20"
        >
          <Bot className="h-8 w-8" />
          <span className="sr-only">Open AI Advisor</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px] md:max-w-lg lg:max-w-2xl grid-rows-[auto,1fr,auto] h-[80vh] p-0">
        <DialogHeader className="p-4 border-b">
          <DialogTitle>AI Career Advisor</DialogTitle>
          <DialogDescription>
            Your personal guide to career and education paths.
          </DialogDescription>
        </DialogHeader>
        <ScrollArea className="flex-grow p-4">
            <div className="flex flex-col gap-4">
                {conversation.map((entry, index) => (
                    <div key={index} className={cn("flex items-start gap-3", entry.role === 'user' ? 'justify-end' : 'justify-start')}>
                        {entry.role === 'bot' && (
                            <Avatar className="h-8 w-8 border-2 border-primary">
                                <AvatarFallback><Bot className="w-4 h-4"/></AvatarFallback>
                            </Avatar>
                        )}
                        <div className={cn(
                            "max-w-[75%] rounded-lg p-3 text-sm",
                            entry.role === 'user' ? 'bg-primary text-primary-foreground' : 'bg-muted'
                        )}>
                            <p>{entry.message}</p>
                        </div>
                        {entry.role === 'user' && (
                             <Avatar className="h-8 w-8 border-2 border-muted-foreground">
                                <AvatarFallback><User className="w-4 h-4"/></AvatarFallback>
                            </Avatar>
                        )}
                    </div>
                ))}
            </div>
        </ScrollArea>
        <DialogFooter className="p-4 border-t">
            <div className="flex w-full items-center space-x-2">
                <Input 
                    type="text" 
                    placeholder="Ask about careers, colleges..." 
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                />
                <Button type="submit" size="icon" onClick={handleSend}>
                    <Send className="h-4 w-4" />
                    <span className="sr-only">Send</span>
                </Button>
            </div>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
