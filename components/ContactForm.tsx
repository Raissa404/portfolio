"use client";

import { useState, type FormEvent } from "react";
import emailjs from "@emailjs/browser";

type Status = "idle" | "sending" | "sent" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "sending") return;

    const form = event.currentTarget;
    const data = new FormData(form);
    const params = {
      nom: data.get("nom"),
      email: data.get("email"),
      sujet: data.get("sujet"),
      message: data.get("message"),
    };

    setStatus("sending");
    try {
      await emailjs.send(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!,
        params,
        { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY! },
      );
      setStatus("sent");
      form.reset();
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="contact__form-status" role="status">
        Merci, votre message est bien envoyé. Je vous réponds sous 48&nbsp;h.
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <p className="contact__form-title">Formulaire</p>
      <div className="field">
        <label className="field__label" htmlFor="nom">
          Nom
        </label>
        <input
          id="nom"
          name="nom"
          type="text"
          required
          autoComplete="name"
          className="field__input"
          placeholder="Votre nom"
        />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="email">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          required
          autoComplete="email"
          className="field__input"
          placeholder="vous@exemple.com"
        />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="sujet">
          Sujet
        </label>
        <input
          id="sujet"
          name="sujet"
          type="text"
          required
          className="field__input"
          placeholder="Stage, projet, collaboration…"
        />
      </div>
      <div className="field">
        <label className="field__label" htmlFor="message">
          Message
        </label>
        <textarea
          id="message"
          name="message"
          required
          className="field__input"
          placeholder="Parlez-moi de votre projet."
        />
      </div>
      {status === "error" && (
        <p className="contact__form-status" role="alert">
          Une erreur est survenue. Réessayez ou écrivez-moi directement par
          email.
        </p>
      )}
      <div className="contact__submit">
        <button type="submit" className="btn" disabled={status === "sending"}>
          {status === "sending" ? "Envoi…" : "Envoyer le message"}
        </button>
      </div>
    </form>
  );
}
