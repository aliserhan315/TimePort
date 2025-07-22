<?php

namespace App\Mail;

use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Mail\Mailable;
use Illuminate\Mail\Mailables\Content;
use Illuminate\Mail\Mailables\Envelope;
use Illuminate\Queue\SerializesModels;
use App\Models\Capsule; 
use App\Models\User;   

class CapsuleActivatedMail extends Mailable
{
    use Queueable, SerializesModels;

    public $capsule;
    public $user;

    /**
     * Create a new message instance.
     */
    public function __construct(Capsule $capsule, User $user) 
    {
        $this->capsule = $capsule;
        $this->user = $user;
    }

    /**
     * Get the message envelope.
     */
    public function envelope(): Envelope
    {
    return new Envelope(
        subject: 'Your Time Capsule "' . $this->capsule->name . '" Has Been Activated!',
        );
    }

    /**
     * Get the message content definition.
     */
    public function content(): Content
    {
        return new Content(
            markdown: 'emails.capsules.activated', 
            with: [
                'capsuleName' => $this->capsule->name,
                'userName' => $this->user->name, 
                'activationDate' => $this->capsule->activation_date->format('F j, Y'),
            ],
        );
    }

    /**
     * Get the attachments for the message.
     *
     * @return array<int
     */
    public function attachments(): array
    {
        return [];
    }
}
