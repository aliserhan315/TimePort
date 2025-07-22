@component('mail::message')
# Hello {{ $userName }},

Great news! Your time capsule, **"{{ $capsuleName }}"**, has officially been activated on {{ $activationDate }}.

It's time to revisit your past self and discover the memories, messages, and files you've stored.

@component('mail::button', ['url' => url('/userpage')])
View Your Capsules
@endcomponent

We hope you enjoy this journey back in time!

Thanks,
{{ config('app.name') }}
@endcomponent
