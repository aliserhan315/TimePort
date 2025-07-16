<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
           Schema::create('capsules', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('user_id'); 
                $table->index('user_id'); 
                $table->string('name');
                $table->string('country')->nullable(); 
                $table->boolean('is_activated')->default(false);
                $table->boolean('is_surprise')->default(false);
                $table->boolean('is_public')->default(false);
                $table->string('mood')->nullable();
                $table->text('message')->nullable();
                $table->timestamp('activation_date')->nullable();
                $table->timestamps();
        });

    Schema::create('files_', function (Blueprint $table) {
                $table->id();
                $table->unsignedBigInteger('capsule_id'); 
                $table->index('capsule_id');             
                $table->string('file_name');               
                $table->string('file_type');              
                $table->longText('file_data');           
                $table->timestamps();
            });

          
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('capsules');
    }
};
