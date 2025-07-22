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
       $now= Carbon::now();
    $capsulesToActivate = Capsule::where('is_activated', false)
    ->whereDate('activation_date', '<=', $now->toDateString())
    ->get();
    if ($capsulesToActivate->isEmpty()) {
        $this->info('No capsules to activate at this time.');
        return;
        }
     foreach ($capsulesToActivate as $capsule) {
            $owner = User::find($capsule->user_id);

            if (!$owner) {      
                continue; 
            }
         
            $capsule->is_activated = true;
            $capsule->save();
            Mail::to($owner->email)->send(new CapsuleActivatedMail($capsule, $owner));

          }

        $this->info("Capsule activation process completed. Activated capsules.");
  
    }
}
