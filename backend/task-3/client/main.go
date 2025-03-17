package main

import (
	"bufio"
	"time"
	"context"
	"encoding/json"
	"fmt"
	"log"
	"strings"
	"net/http"
	pb "github.com/hygenec2olkid/7-solutions-assignment/backend/task-3/proto/beefpb"
	"google.golang.org/grpc"
	"google.golang.org/grpc/credentials/insecure"
)

func main() {
	// create Server at endpoint /beef/summary
	http.HandleFunc("/beef/summary", beefSummaryHandler)
	fmt.Println("🚀 HTTP Server is running on port 8080...")
	log.Fatal(http.ListenAndServe(":8080", nil))
}

func beefSummaryHandler(w http.ResponseWriter, r *http.Request) {
	// Connect to gRPC server
	conn, err := grpc.NewClient("localhost:9000", grpc.WithTransportCredentials(insecure.NewCredentials()))
	if err != nil {
		log.Fatalf("Failed to connect: %v", err)
	}
	defer conn.Close()

	client := pb.NewBeefServiceClient(conn)

	ctx, cancel := context.WithTimeout(context.Background(), 5*time.Second)
	defer cancel()

	// Make a request
	response, err := client.FetchBeef(ctx, &pb.BeefRequest{})
	if err != nil {
		log.Fatalf("Error calling FetchBeef: %v", err)
	}

	jsonResponse := handleIdentifyBeef(response.Text)

	w.Header().Set("Content-Type", "application/json")
	w.WriteHeader(http.StatusOK)
	w.Write([]byte(jsonResponse))

}

type BeefResponse struct {
	Beef map[string]int `json:"beef"`
}

func handleIdentifyBeef(response string) string {
	beefData := BeefResponse{Beef: make(map[string]int)}
	scanner := bufio.NewScanner(strings.NewReader(response))
	for scanner.Scan() {
		line := scanner.Text()
		identifyBeef(line, beefData)
	}
	// Convert to JSON
	jsonData, err := json.MarshalIndent(beefData, "", "    ")
	if err != nil {
		fmt.Println("Error marshalling JSON:", err)
	}
	return string(jsonData)

}

func identifyBeef(line string, beefType BeefResponse) {
	cleaned := strings.ReplaceAll(line, ",", "")
	cleaned = strings.ReplaceAll(cleaned, ".", "")

	cleaned = strings.ToLower(cleaned)

	words := strings.Fields(cleaned)

	for _, beef := range words {
		beefType.Beef[beef]++
	}
}
