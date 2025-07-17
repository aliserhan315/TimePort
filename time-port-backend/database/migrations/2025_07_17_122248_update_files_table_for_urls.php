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
        Schema::table('files_', function (Blueprint $table) {
            $table->dropColumn('file_data');          // remove old longText column
            $table->string('file_path')->nullable();  // add file_path
        });
    }


    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::table('files_', function (Blueprint $table) {
            $table->longText('file_data')->nullable();
            $table->dropColumn('file_path');
        });
    }
};
