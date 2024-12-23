FROM denoland/deno:alpine-2.1.4

EXPOSE 15151

WORKDIR /app

COPY . .

RUN deno install && deno cache main.ts && chown -R deno:deno /app/player_data && chmod -R 775 /app/player_data

USER deno

CMD ["task", "run"]