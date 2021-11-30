#!/bin/sh


source venv/Scripts/activate


while true
do
  echo "tudo de novo"
  sleep 2
  rm -rf ./output/*
  python crawler/google-news-crawler.py
  python crawler/coinmarketcap-crawler.py
  git add ./output/*
  git commit -m"update data $(date +%d/%m/%Y" - "%H:%M:%S)"
  git push origin main

  echo "durmi um poquinho"
  sleep 5
done
