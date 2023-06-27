package main

import (
	"context"
	"log"

	"github.com/chromedp/chromedp"
)

func main() {
	opts := append(chromedp.DefaultExecAllocatorOptions[:],
		chromedp.DisableGPU,
		chromedp.Flag("headless", false),
	)
	allocCtx, _ := chromedp.NewExecAllocator(context.Background(), opts...)

	ctx, _ := chromedp.NewContext(allocCtx)
	if err := chromedp.Run(ctx, chromedp.Navigate("https://google.com")); err != nil {
		log.Fatalln(err)
	}

}
