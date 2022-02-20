#/usr/bin/env bash
sudo apt-get install unzip dos2unix

echo "wget posters and metadata"
wget https://www.cs.ccu.edu.tw/~wtchu/projects/MoviePoster/Movie_Poster_Dataset.zip
wget https://www.cs.ccu.edu.tw/~wtchu/projects/MoviePoster/Movie_Poster_Metadata.zip

unzip Movie_Poster_Dataset.zip > /dev/null
mv Movie_Poster_Dataset movie-poster-dataset

unzip Movie_Poster_Metadata.zip > /dev/null
mv groundtruth movie-metadata
cd movie-metadata/ && ls | xargs dos2unix -k  > /dev/null

cd ..

echo "clean up"
rm Movie_Poster_Dataset.zip
rm Movie_Poster_Metadata.zip
