"use client";

import { useState } from 'react';
import { Button } from '@/components/ui/Button';

export default function NewsletterSection() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica para inscrição na newsletter
    alert(`Email ${email} inscrito com sucesso!`);
    setEmail("");
  };
  
  return (
    <div className="bg-gray-100 rounded-xl p-4 sm:p-8 mb-12">
      <div className="max-w-2xl mx-auto text-center">
        <h3 className="text-xl sm:text-2xl font-bold mb-2">Inscreva-se em nossa newsletter</h3>
        <p className="text-gray-600 mb-4 sm:mb-6 text-sm sm:text-base">
          Receba ofertas exclusivas e novidades diretamente no seu e-mail
        </p>
        <form onSubmit={handleSubmit} className="flex flex-col sm:flex-row gap-2">
          <input
            type="email"
            placeholder="Seu melhor e-mail"
            className="flex-grow px-3 sm:px-4 py-2 sm:py-3 rounded-md border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-500 text-sm"
            aria-label="Seu email para newsletter"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button variant="primary" type="submit">
            Inscrever-se
          </Button>
        </form>
      </div>
    </div>
  );
}