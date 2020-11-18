package storage

import (
	"context"
	"fmt"
	"io"
	"time"

	"cloud.google.com/go/storage"
)

const (
	Maps = "activity_maps"
	Files = "activity_files"
)

// UploadFile takes a file and uploads it to a gcloud storage bucket.
func UploadFile(bucket, objectName string, f io.Reader) error {
	ctx := context.Background()
	client, err := storage.NewClient(ctx)
	
    if err != nil {
        return fmt.Errorf("storage.NewClient: %v", err)
    }
    defer client.Close()

    ctx, cancel := context.WithTimeout(ctx, time.Second*50)
    defer cancel()

    // Upload an object with storage.Writer.
    wc := client.Bucket(bucket).Object(objectName).NewWriter(ctx)
    if _, err = io.Copy(wc, f); err != nil {
            return fmt.Errorf("io.Copy: %v", err)
    }
    if err := wc.Close(); err != nil {
            return fmt.Errorf("Writer.Close: %v", err)
    }
    fmt.Printf("Blob uploaded.\n")
    return nil
}