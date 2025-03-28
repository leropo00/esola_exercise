<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use App\Http\Controllers\FileUploadController;

Route::get('/', function (Request $request) {

    return response('Hello world', 200)
        ->header('Content-Type', 'text/json');
});