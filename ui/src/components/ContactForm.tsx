import { useState } from 'react';

interface ContactFormProps {
  onSent: () => void;
  playSound: (sound: string) => void;
}

export const ContactForm = ({ onSent, playSound }: ContactFormProps) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    playSound('submit-form');
    console.log('Form data submitted:', formData);
    // Here you would typically send the data to a backend API
    onSent();
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