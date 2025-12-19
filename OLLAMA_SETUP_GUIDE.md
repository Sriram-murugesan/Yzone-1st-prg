# Ollama + DeepSeek LLM Setup Guide

This guide explains how to set up Ollama with DeepSeek models for local AI inference in the AI Decision Tracker application.

## Prerequisites

1. **Ollama Installation**
   - Download and install Ollama from [https://ollama.ai](https://ollama.ai)
   - Ensure Ollama is running (usually starts automatically after installation)
   - Verify installation: `ollama --version`

2. **System Requirements**
   - Minimum 8GB RAM (16GB recommended)
   - Minimum 10GB free disk space
   - Compatible with Windows, macOS, and Linux

## Installing DeepSeek Models

### Option 1: DeepSeek R1 (Recommended)
```bash
# Pull the DeepSeek R1 model
ollama pull deepseek-r1

# Verify the model is available
ollama list
```

### Option 2: DeepSeek Coder (Alternative)
If deepseek-r1 is not available, use the coder variant:
```bash
# Pull the DeepSeek Coder model
ollama pull deepseek-coder

# Verify the model is available
ollama list
```

## Verifying Ollama Setup

### Check Ollama Status
```bash
# Check if Ollama service is running
curl http://localhost:11434/api/tags

# Should return a list of available models
```

### Test Model Directly
```bash
# Test the model with a simple prompt
curl http://localhost:11434/api/generate -d '{
  "model": "deepseek-r1",
  "prompt": "Hello, are you working?",
  "stream": false
}'
```

## Configuration

The application is configured to use Ollama via environment variables:

```env
# Ollama configuration (in .env file)
OLLAMA_URL=http://localhost:11434
OLLAMA_MODEL=deepseek-r1
```

## Troubleshooting

### Common Issues

1. **Model not found**
   - Solution: Pull the required model using `ollama pull deepseek-r1`

2. **Ollama not running**
   - Solution: Start Ollama service or restart your computer

3. **Connection refused**
   - Solution: Check if Ollama is running on port 11434
   - Command: `netstat -an | grep 11434` (Linux/macOS) or `netstat -an | findstr 11434` (Windows)

4. **Insufficient memory**
   - Solution: Close other applications or use a smaller model

### Testing the Integration

Run the test script to verify the integration works:
```bash
# From the project root directory
node test-deepseek-ollama.js
```

## Performance Notes

- **Response Time**: 10-30 seconds depending on system specs
- **Memory Usage**: 4-8GB during inference
- **CPU Usage**: High during processing

## Advanced Configuration

### Custom Ollama URL
If running Ollama on a different machine:
```env
OLLAMA_URL=http://your-ollama-server:11434
```

### Model Selection
To use a different DeepSeek variant:
```env
OLLAMA_MODEL=deepseek-coder
```

## Security Considerations

- Ollama runs locally, so no data leaves your machine
- All AI processing happens on your computer
- No API keys or cloud credentials required

## Resource Management

### Stopping Ollama
```bash
# On Linux/macOS
sudo systemctl stop ollama

# On Windows
# Stop the Ollama service from Services panel
```

### Managing Models
```bash
# List all models
ollama list

# Remove unused models
ollama rm model-name
```

## Support

For issues with Ollama:
- Visit [https://github.com/ollama/ollama/issues](https://github.com/ollama/ollama/issues)
- Check the community Discord: [https://discord.gg/ollama](https://discord.gg/ollama)

For issues with this application:
- Ensure Ollama is running and models are pulled
- Check the application logs for specific error messages