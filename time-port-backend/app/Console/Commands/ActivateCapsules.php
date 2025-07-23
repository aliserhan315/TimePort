<?php

namespace App\Console\Commands;
use App\Models\Capsule;
use Carbon\Carbon;
use App\Models\User;
use Illuminate\Console\Command;
use Illuminate\Support\Facades\Mail;
use App\Mail\CapsuleActivatedMail;

class ActivateCapsules extends Command
{
    /**
     * The name and signature of the console command.
     *
     * @var string
     */
    protected $signature = 'app:activate-capsules';

    /**
     * The console command description.
     *
     * @var string
     */
    protected $description = 'Activate capsules that activation date is today and notify users';

    /**
     * Execute the console command.
     */
      public function handle()
    {
        
           Capsule::where('is_activated', false)
            ->whereDate('activation_date', '<=', Carbon::today())
            ->update(['is_activated' => true]);
            $capsules = Capsule::where('is_activated', false)
        ->whereDate('activation_date', '<=', Carbon::today())
        ->get();
            foreach ($capsules as $capsule) {
                $user = User::find($capsule->user_id);

                Mail::to($user->email)->send(new CapsuleActivatedMail($capsule,$user));
                
            }


        $this->info('Capsules activated successfully.');
    }
}
