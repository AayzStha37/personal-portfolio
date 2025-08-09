import { useState } from 'react';
import { useIsMobile } from '@/hooks/use-mobile';

interface ContactFormProps {
  onSent: () => void;
  onError: (message: string) => void;
  playSound: (sound: string) => void;
}

export const ContactForm = ({ onSent, onError, playSound }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const isMobile = useIsMobile();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (isSending || !formData.name || !formData.email || !formData.message) {
      console.log('Submission stopped by client-side check. A field is empty.');
      return;
    }
    
    setIsSending(true);
    setError(null);

    const workerUrl = 'https://portfolio-email-sender.saayush97.workers.dev';

    try {
      const response = await fetch(workerUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ formData }),
      });

      if (!response.ok) {
      let errorMsg = 'An error occurred. Please try again.';
      try {
        const errorData = await response.json();
        errorMsg = errorData?.message || errorMsg;
      } catch {
        // ignore JSON parse errors
      }
        throw new Error(errorMsg);
      }

      playSound('submit-form-success');
      setFormData({ name: '', email: '', message: '' });
      onSent();
    } catch (err: unknown) {
      console.error('Submission failed:', err);
      playSound('submit-form-error');
      if (err instanceof Error) {
        onError("Error: Please Retry!");
      } 
    } finally {
      setIsSending(false);
    }
  };

  if (isMobile) {
    return (
      <form onSubmit={handleSubmit} className="animate-fade-in px-3 py-3 space-y-3">
        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 text-destructive font-mono text-xs p-2">
            {error}
          </div>
        )}

        <div className="space-y-1.5">
          <label htmlFor="name" className="block font-mono text-[10px] tracking-wide text-foreground">NAME</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            placeholder="Your name"
            autoComplete="name"
            autoCapitalize="words"
            className="w-full h-11 px-3 font-mono text-xs bg-arcade-screen/60 border border-border rounded-md focus:border-primary focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="email" className="block font-mono text-[10px] tracking-wide text-foreground">EMAIL</label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            placeholder="you@example.com"
            autoComplete="email"
            inputMode="email"
            className="w-full h-11 px-3 font-mono text-xs bg-arcade-screen/60 border border-border rounded-md focus:border-primary focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
          />
        </div>

        <div className="space-y-1.5">
          <label htmlFor="message" className="block font-mono text-[10px] tracking-wide text-foreground">MESSAGE</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            value={formData.message}
            onChange={handleChange}
            required
            placeholder="Write your message..."
            className="w-full px-3 py-2 font-mono text-xs bg-arcade-screen/60 border border-border rounded-md focus:border-primary focus:ring-2 focus:ring-primary/40 placeholder:text-muted-foreground/70"
          />
        </div>

        <button
          type="submit"
          disabled={isSending}
          className="w-full font-arcade text-xs px-3 py-2 rounded-md transition-colors duration-200 bg-primary text-primary-foreground shadow-md hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
        >
          {isSending ? 'SENDING...' : 'SEND'}
        </button>
      </form>
    );
  }

  // Desktop view
  return (
    <form onSubmit={handleSubmit} className="space-y-4 text-left animate-fade-in">
      <div>
        <label htmlFor="name" className="block font-mono text-sm text-foreground mb-1">NAME:</label>
        <input
          type="text"
          id="name"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
          className="w-full p-2 font-mono bg-background border border-border rounded focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="email" className="block font-mono text-sm text-foreground mb-1">EMAIL:</label>
        <input
          type="email"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          className="w-full p-2 font-mono bg-background border border-border rounded focus:border-primary focus:outline-none"
        />
      </div>
      <div>
        <label htmlFor="message" className="block font-mono text-sm text-foreground mb-1">MESSAGE:</label>
        <textarea
          id="message"
          name="message"
          rows={4}
          value={formData.message}
          onChange={handleChange}
          required
          className="w-full p-2 font-mono bg-background border border-border rounded focus:border-primary focus:outline-none"
        />
      </div>
      {error && (
        <p className="font-mono text-sm text-destructive">{error}</p>
      )}
      <button
        type="submit"
        className="w-full font-arcade text-lg px-6 py-2 rounded transition-colors duration-200 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90 disabled:opacity-70 disabled:cursor-not-allowed"
        disabled={isSending}
      >
        {isSending ? 'SENDING...' : 'SEND INSTRUCTIONS'}
      </button>
    </form>
  );
};