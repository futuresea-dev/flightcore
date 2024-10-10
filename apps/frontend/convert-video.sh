#!/bin/bash
SOURCE_FILE="public/assets/videos/hero.mp4"

ffmpeg -i $SOURCE_FILE -c:v libx264 -preset slower -profile:v high -level 4.0 -crf 23 -vf "scale=1920:1080" -c:a aac -b:a 128k -movflags +faststart -pix_fmt yuv420p ${SOURCE_FILE%.*}_1080p.mp4
ffmpeg -i $SOURCE_FILE -c:v libx264 -preset slower -profile:v high -level 3.1 -crf 23 -vf "scale=1280:720" -c:a aac -b:a 128k -r 30 -movflags +faststart -pix_fmt yuv420p ${SOURCE_FILE%.*}_720p.mp4
ffmpeg -i $SOURCE_FILE -c:v libx264 -preset slower -profile:v main -level 3.0 -crf 23 -vf "scale=854:480" -c:a aac -b:a 128k -movflags +faststart -pix_fmt yuv420p ${SOURCE_FILE%.*}_480p.mp4
ffmpeg -i $SOURCE_FILE -c:v libx264 -preset slower -profile:v main -level 3.0 -crf 23 -vf "scale=640:360" -c:a aac -b:a 128k -r 30 -movflags +faststart -pix_fmt yuv420p ${SOURCE_FILE%.*}_360p.mp4
