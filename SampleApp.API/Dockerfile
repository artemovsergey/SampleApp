FROM mcr.microsoft.com/dotnet/aspnet:9.0 AS base
WORKDIR /app
EXPOSE 5299

ENV ASPNETCORE_URLS=http://+:5299

USER app
FROM --platform=$BUILDPLATFORM mcr.microsoft.com/dotnet/sdk:9.0 AS build
ARG configuration=Release
WORKDIR /src
COPY ["SampleApp.API/SampleApp.API.csproj", "SampleApp.API/"]
RUN dotnet restore "SampleApp.API/SampleApp.API.csproj"
COPY . .
WORKDIR "/src/SampleApp.API"
RUN dotnet build "SampleApp.API.csproj" -c $configuration -o /app/build

FROM build AS publish
ARG configuration=Release
RUN dotnet publish "SampleApp.API.csproj" -c $configuration -f net9.0 -o /app/publish /p:UseAppHost=false

FROM base AS final
WORKDIR /app
COPY --from=publish /app/publish .

# COPY ./certificate/localhost.key /app/certificate/localhost.key
# COPY ./certificate/localhost.crt /app/certificate/localhost.crt

ENTRYPOINT ["dotnet", "SampleApp.API.dll"]
