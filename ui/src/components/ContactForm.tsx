import { useState } from 'react';

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
      <button
        type="submit"
        className="w-full font-arcade text-lg px-6 py-2 rounded transition-colors duration-200 bg-primary text-primary-foreground shadow-lg hover:bg-primary/90"
      >
        SEND INSTRUCTIONS
      </button>
    </form>
  );
};