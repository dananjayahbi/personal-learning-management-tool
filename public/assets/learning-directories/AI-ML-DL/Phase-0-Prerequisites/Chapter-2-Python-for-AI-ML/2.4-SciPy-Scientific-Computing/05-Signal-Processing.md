# 05 - Signal Processing with SciPy

## 📋 Table of Contents
- [Introduction](#introduction)
- [Signal Filtering](#signal-filtering)
- [Fourier Transform](#fourier-transform)
- [Spectral Analysis](#spectral-analysis)
- [Convolution and Correlation](#convolution-and-correlation)
- [Wavelets](#wavelets)
- [Window Functions](#window-functions)
- [Applications in ML](#applications-in-ml)
- [Practice Exercises](#practice-exercises)

---

## Introduction

Signal processing techniques are essential for time series analysis, audio processing, and feature extraction in machine learning.

```python
import numpy as np
import matplotlib.pyplot as plt
from scipy import signal, fft
from scipy.signal import butter, filtfilt, welch, spectrogram
import pandas as pd

# Check version
import scipy
print(scipy.__version__)
```

---

## Signal Filtering

### Low-Pass Filter

```python
# Generate noisy signal
fs = 1000  # Sampling frequency (Hz)
t = np.linspace(0, 1, fs, endpoint=False)

# Signal: 5 Hz sine + 50 Hz sine + noise
signal_clean = np.sin(2*np.pi*5*t) + 0.5*np.sin(2*np.pi*50*t)
noise = 0.5*np.random.randn(len(t))
signal_noisy = signal_clean + noise

# Design low-pass Butterworth filter
cutoff = 15  # Cutoff frequency (Hz)
order = 5
nyquist = 0.5 * fs
normal_cutoff = cutoff / nyquist

b, a = signal.butter(order, normal_cutoff, btype='low', analog=False)

# Apply filter
signal_filtered = signal.filtfilt(b, a, signal_noisy)

# Plot
fig, axes = plt.subplots(3, 1, figsize=(12, 10))

axes[0].plot(t, signal_clean, 'g-', linewidth=2, label='Clean signal')
axes[0].set_ylabel('Amplitude')
axes[0].set_title('Original Clean Signal')
axes[0].legend()
axes[0].grid(True)

axes[1].plot(t, signal_noisy, 'b-', alpha=0.7, label='Noisy signal')
axes[1].set_ylabel('Amplitude')
axes[1].set_title('Noisy Signal')
axes[1].legend()
axes[1].grid(True)

axes[2].plot(t, signal_filtered, 'r-', linewidth=2, label='Filtered signal')
axes[2].plot(t, signal_clean, 'g--', alpha=0.5, label='Original')
axes[2].set_xlabel('Time (s)')
axes[2].set_ylabel('Amplitude')
axes[2].set_title('Low-Pass Filtered Signal')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

### High-Pass Filter

```python
# High-pass filter (remove low frequencies)
cutoff = 30  # Hz
b, a = signal.butter(order, cutoff / nyquist, btype='high')
signal_highpass = signal.filtfilt(b, a, signal_noisy)

plt.figure(figsize=(12, 6))
plt.plot(t, signal_noisy, 'b-', alpha=0.5, label='Noisy signal')
plt.plot(t, signal_highpass, 'r-', linewidth=2, label='High-pass filtered')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title(f'High-Pass Filter (cutoff = {cutoff} Hz)')
plt.legend()
plt.grid(True)
plt.show()
```

### Band-Pass Filter

```python
# Band-pass filter (keep only specific frequency range)
low_cutoff = 40  # Hz
high_cutoff = 60  # Hz
b, a = signal.butter(order, [low_cutoff / nyquist, high_cutoff / nyquist], btype='band')
signal_bandpass = signal.filtfilt(b, a, signal_noisy)

plt.figure(figsize=(12, 6))
plt.plot(t, signal_noisy, 'b-', alpha=0.5, label='Noisy signal')
plt.plot(t, signal_bandpass, 'r-', linewidth=2, label='Band-pass filtered')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title(f'Band-Pass Filter ({low_cutoff}-{high_cutoff} Hz)')
plt.legend()
plt.grid(True)
plt.show()
```

### Band-Stop (Notch) Filter

```python
# Band-stop filter (remove specific frequency range)
low_cutoff = 45  # Hz
high_cutoff = 55  # Hz
b, a = signal.butter(order, [low_cutoff / nyquist, high_cutoff / nyquist], btype='bandstop')
signal_bandstop = signal.filtfilt(b, a, signal_noisy)

plt.figure(figsize=(12, 6))
plt.plot(t, signal_noisy, 'b-', alpha=0.5, label='Noisy signal')
plt.plot(t, signal_bandstop, 'r-', linewidth=2, label='Band-stop filtered')
plt.xlabel('Time (s)')
plt.ylabel('Amplitude')
plt.title(f'Band-Stop Filter ({low_cutoff}-{high_cutoff} Hz)')
plt.legend()
plt.grid(True)
plt.show()
```

### Frequency Response

```python
# Visualize filter frequency response
b, a = signal.butter(5, 15 / nyquist, btype='low')
w, h = signal.freqz(b, a, worN=8000)

# Convert to Hz
freq = w * fs / (2 * np.pi)

plt.figure(figsize=(12, 5))

# Magnitude
plt.subplot(1, 2, 1)
plt.plot(freq, 20 * np.log10(abs(h)), 'b', linewidth=2)
plt.axvline(15, color='r', linestyle='--', label='Cutoff frequency')
plt.xlabel('Frequency (Hz)')
plt.ylabel('Magnitude (dB)')
plt.title('Frequency Response - Magnitude')
plt.grid(True)
plt.legend()

# Phase
plt.subplot(1, 2, 2)
plt.plot(freq, np.angle(h), 'g', linewidth=2)
plt.xlabel('Frequency (Hz)')
plt.ylabel('Phase (radians)')
plt.title('Frequency Response - Phase')
plt.grid(True)

plt.tight_layout()
plt.show()
```

---

## Fourier Transform

### FFT (Fast Fourier Transform)

```python
# Generate signal with multiple frequencies
fs = 1000
t = np.linspace(0, 1, fs, endpoint=False)
signal_data = (np.sin(2*np.pi*50*t) + 
               0.5*np.sin(2*np.pi*120*t) + 
               0.3*np.sin(2*np.pi*200*t))

# Compute FFT
fft_values = fft.fft(signal_data)
fft_freq = fft.fftfreq(len(signal_data), 1/fs)

# Get positive frequencies only
positive_freq_idx = fft_freq >= 0
fft_freq_positive = fft_freq[positive_freq_idx]
fft_magnitude = np.abs(fft_values[positive_freq_idx])

# Plot
fig, axes = plt.subplots(2, 1, figsize=(12, 10))

# Time domain
axes[0].plot(t[:200], signal_data[:200], 'b-', linewidth=2)
axes[0].set_xlabel('Time (s)')
axes[0].set_ylabel('Amplitude')
axes[0].set_title('Signal in Time Domain')
axes[0].grid(True)

# Frequency domain
axes[1].stem(fft_freq_positive, fft_magnitude, 'r', markerfmt='ro', basefmt=' ')
axes[1].set_xlabel('Frequency (Hz)')
axes[1].set_ylabel('Magnitude')
axes[1].set_title('Signal in Frequency Domain (FFT)')
axes[1].set_xlim([0, 250])
axes[1].grid(True)

plt.tight_layout()
plt.show()

# Find peaks
peaks, _ = signal.find_peaks(fft_magnitude, height=50)
print("Detected frequencies:")
for peak in peaks:
    print(f"  {fft_freq_positive[peak]:.1f} Hz (magnitude: {fft_magnitude[peak]:.1f})")
```

### Power Spectral Density

```python
# Compute PSD using Welch's method
freqs, psd = signal.welch(signal_data, fs, nperseg=256)

plt.figure(figsize=(12, 6))
plt.semilogy(freqs, psd, 'b-', linewidth=2)
plt.xlabel('Frequency (Hz)')
plt.ylabel('Power Spectral Density (V²/Hz)')
plt.title("Power Spectral Density (Welch's Method)")
plt.grid(True)
plt.xlim([0, 250])
plt.show()
```

### Short-Time Fourier Transform (STFT)

```python
# Generate signal with time-varying frequency (chirp)
t = np.linspace(0, 10, 10000)
signal_chirp = signal.chirp(t, f0=1, f1=50, t1=10, method='linear')

# Compute STFT
f, t_stft, Zxx = signal.stft(signal_chirp, fs=1000, nperseg=256)

# Plot spectrogram
plt.figure(figsize=(12, 8))
plt.pcolormesh(t_stft, f, np.abs(Zxx), shading='gouraud', cmap='viridis')
plt.colorbar(label='Magnitude')
plt.ylabel('Frequency (Hz)')
plt.xlabel('Time (s)')
plt.title('Short-Time Fourier Transform (Spectrogram)')
plt.ylim([0, 60])
plt.show()
```

---

## Spectral Analysis

### Spectrogram

```python
# Generate complex signal
fs = 10000
t = np.linspace(0, 5, fs * 5)

# Signal with changing frequencies
signal_complex = (signal.chirp(t, f0=100, f1=500, t1=5, method='quadratic') +
                  0.5 * np.sin(2*np.pi*1000*t) * (t < 2))

# Compute spectrogram
f, t_spec, Sxx = signal.spectrogram(signal_complex, fs, nperseg=1024)

# Plot
plt.figure(figsize=(12, 8))
plt.pcolormesh(t_spec, f, 10 * np.log10(Sxx), shading='gouraud', cmap='jet')
plt.colorbar(label='Power (dB)')
plt.ylabel('Frequency (Hz)')
plt.xlabel('Time (s)')
plt.title('Spectrogram')
plt.ylim([0, 2000])
plt.show()
```

### Periodogram

```python
# Estimate power spectral density
f, Pxx = signal.periodogram(signal_data, fs)

plt.figure(figsize=(12, 6))
plt.semilogy(f, Pxx, 'b-', linewidth=2)
plt.xlabel('Frequency (Hz)')
plt.ylabel('PSD (V²/Hz)')
plt.title('Periodogram')
plt.grid(True)
plt.xlim([0, 250])
plt.show()
```

---

## Convolution and Correlation

### Convolution

```python
# Signal convolution
signal1 = np.array([1, 2, 3, 4, 5])
signal2 = np.array([0, 1, 0.5])

# Full convolution
conv_full = np.convolve(signal1, signal2, mode='full')

# Same size
conv_same = np.convolve(signal1, signal2, mode='same')

# Valid (no padding)
conv_valid = np.convolve(signal1, signal2, mode='valid')

print("Signal 1:", signal1)
print("Signal 2:", signal2)
print("Full convolution:", conv_full)
print("Same convolution:", conv_same)
print("Valid convolution:", conv_valid)

# Visualize
fig, axes = plt.subplots(3, 1, figsize=(12, 10))

axes[0].stem(signal1, basefmt=' ')
axes[0].set_title('Signal 1')
axes[0].grid(True)

axes[1].stem(signal2, basefmt=' ')
axes[1].set_title('Signal 2 (Kernel)')
axes[1].grid(True)

axes[2].stem(conv_full, basefmt=' ')
axes[2].set_title('Convolution Result')
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

### 2D Convolution (Image Processing)

```python
# Create simple image
image = np.zeros((50, 50))
image[20:30, 20:30] = 1

# Edge detection kernel (Sobel)
kernel_x = np.array([[-1, 0, 1],
                     [-2, 0, 2],
                     [-1, 0, 1]])

kernel_y = np.array([[-1, -2, -1],
                     [0, 0, 0],
                     [1, 2, 1]])

# Apply convolution
edges_x = signal.convolve2d(image, kernel_x, mode='same')
edges_y = signal.convolve2d(image, kernel_y, mode='same')
edges = np.sqrt(edges_x**2 + edges_y**2)

# Plot
fig, axes = plt.subplots(1, 4, figsize=(16, 4))

axes[0].imshow(image, cmap='gray')
axes[0].set_title('Original')
axes[0].axis('off')

axes[1].imshow(edges_x, cmap='gray')
axes[1].set_title('Edges X')
axes[1].axis('off')

axes[2].imshow(edges_y, cmap='gray')
axes[2].set_title('Edges Y')
axes[2].axis('off')

axes[3].imshow(edges, cmap='gray')
axes[3].set_title('Combined Edges')
axes[3].axis('off')

plt.tight_layout()
plt.show()
```

### Cross-Correlation

```python
# Find time delay between two signals
fs = 1000
t = np.linspace(0, 1, fs)

# Signal 1
signal1 = np.sin(2*np.pi*10*t)

# Signal 2 (delayed version)
delay = 100  # samples
signal2 = np.roll(signal1, delay)

# Cross-correlation
correlation = signal.correlate(signal1, signal2, mode='full')
lags = signal.correlation_lags(len(signal1), len(signal2), mode='full')

# Find delay
estimated_delay = lags[np.argmax(correlation)]

print(f"True delay: {delay} samples")
print(f"Estimated delay: {estimated_delay} samples")

# Plot
fig, axes = plt.subplots(3, 1, figsize=(12, 10))

axes[0].plot(t, signal1, 'b-', label='Signal 1')
axes[0].set_ylabel('Amplitude')
axes[0].set_title('Signal 1')
axes[0].legend()
axes[0].grid(True)

axes[1].plot(t, signal2, 'r-', label='Signal 2 (delayed)')
axes[1].set_ylabel('Amplitude')
axes[1].set_title('Signal 2 (Delayed)')
axes[1].legend()
axes[1].grid(True)

axes[2].plot(lags / fs, correlation, 'g-')
axes[2].axvline(estimated_delay / fs, color='r', linestyle='--', 
                label=f'Detected delay: {estimated_delay} samples')
axes[2].set_xlabel('Lag (s)')
axes[2].set_ylabel('Correlation')
axes[2].set_title('Cross-Correlation')
axes[2].legend()
axes[2].grid(True)

plt.tight_layout()
plt.show()
```

---

## Wavelets

### Continuous Wavelet Transform

```python
# Generate signal
t = np.linspace(0, 1, 1000)
signal_data = signal.chirp(t, f0=5, f1=50, t1=1, method='linear')

# Wavelet transform (using Ricker wavelet)
widths = np.arange(1, 31)
cwtmatr = signal.cwt(signal_data, signal.ricker, widths)

# Plot
fig, axes = plt.subplots(2, 1, figsize=(12, 10))

axes[0].plot(t, signal_data, 'b-', linewidth=2)
axes[0].set_xlabel('Time (s)')
axes[0].set_ylabel('Amplitude')
axes[0].set_title('Signal (Chirp)')
axes[0].grid(True)

im = axes[1].imshow(cwtmatr, extent=[0, 1, widths[-1], widths[0]], 
                    cmap='viridis', aspect='auto', 
                    vmax=abs(cwtmatr).max(), vmin=-abs(cwtmatr).max())
axes[1].set_xlabel('Time (s)')
axes[1].set_ylabel('Wavelet Width')
axes[1].set_title('Continuous Wavelet Transform')
plt.colorbar(im, ax=axes[1])

plt.tight_layout()
plt.show()
```

---

## Window Functions

### Compare Windows

```python
# Different window functions
window_length = 51

windows = {
    'Rectangular': np.ones(window_length),
    'Hann': signal.windows.hann(window_length),
    'Hamming': signal.windows.hamming(window_length),
    'Blackman': signal.windows.blackman(window_length),
    'Kaiser (β=5)': signal.windows.kaiser(window_length, beta=5)
}

# Plot
fig, axes = plt.subplots(2, 3, figsize=(15, 10))
axes = axes.flatten()

for ax, (name, window) in zip(axes, windows.items()):
    # Time domain
    ax.plot(window, 'b-', linewidth=2)
    ax.set_title(f'{name} Window')
    ax.set_xlabel('Sample')
    ax.set_ylabel('Amplitude')
    ax.grid(True)
    ax.set_ylim([0, 1.1])

axes[-1].axis('off')
plt.tight_layout()
plt.show()

# Frequency response
plt.figure(figsize=(12, 6))
for name, window in windows.items():
    A = fft.fft(window, 2048) / (len(window)/2.0)
    freq = np.linspace(-0.5, 0.5, len(A))
    response = 20 * np.log10(np.abs(fft.fftshift(A / abs(A).max())))
    plt.plot(freq, response, label=name, linewidth=2)

plt.xlabel('Normalized Frequency')
plt.ylabel('Magnitude (dB)')
plt.title('Window Function Frequency Responses')
plt.legend()
plt.grid(True)
plt.ylim([-100, 10])
plt.show()
```

---

## Applications in ML

### Feature Extraction from Audio

```python
# Simulate audio signal
fs = 44100  # Standard audio sampling rate
duration = 2  # seconds
t = np.linspace(0, duration, int(fs * duration))

# Create complex audio signal
audio_signal = (np.sin(2*np.pi*440*t) +  # A4 note
                0.5*np.sin(2*np.pi*880*t) +  # A5 note
                0.3*np.random.randn(len(t)))  # Noise

# Extract features
# 1. Spectral centroid (brightness)
f, Pxx = signal.periodogram(audio_signal, fs)
spectral_centroid = np.sum(f * Pxx) / np.sum(Pxx)

# 2. Zero-crossing rate
zero_crossings = np.sum(np.diff(np.sign(audio_signal)) != 0) / len(audio_signal)

# 3. RMS energy
rms_energy = np.sqrt(np.mean(audio_signal**2))

# 4. Spectral rolloff (95% of energy)
cumsum_pxx = np.cumsum(Pxx)
rolloff_idx = np.where(cumsum_pxx >= 0.95 * cumsum_pxx[-1])[0][0]
spectral_rolloff = f[rolloff_idx]

print("Audio Features:")
print(f"  Spectral Centroid: {spectral_centroid:.2f} Hz")
print(f"  Zero-Crossing Rate: {zero_crossings:.6f}")
print(f"  RMS Energy: {rms_energy:.4f}")
print(f"  Spectral Rolloff: {spectral_rolloff:.2f} Hz")

# Visualize
fig, axes = plt.subplots(2, 1, figsize=(12, 10))

# Waveform
axes[0].plot(t[:1000], audio_signal[:1000], 'b-', linewidth=1)
axes[0].set_xlabel('Time (s)')
axes[0].set_ylabel('Amplitude')
axes[0].set_title('Audio Waveform')
axes[0].grid(True)

# Spectrum
axes[1].semilogy(f, Pxx, 'g-', linewidth=2)
axes[1].axvline(spectral_centroid, color='r', linestyle='--', 
                label=f'Centroid: {spectral_centroid:.0f} Hz')
axes[1].axvline(spectral_rolloff, color='orange', linestyle='--',
                label=f'Rolloff: {spectral_rolloff:.0f} Hz')
axes[1].set_xlabel('Frequency (Hz)')
axes[1].set_ylabel('Power Spectral Density')
axes[1].set_title('Audio Spectrum')
axes[1].legend()
axes[1].grid(True)
axes[1].set_xlim([0, 2000])

plt.tight_layout()
plt.show()
```

### Time Series Denoising

```python
# Create noisy time series
t = np.linspace(0, 10, 1000)
clean_signal = np.sin(2*np.pi*0.5*t) + 0.5*np.sin(2*np.pi*2*t)
noisy_signal = clean_signal + 0.5*np.random.randn(len(t))

# Apply Savitzky-Golay filter (polynomial smoothing)
window_length = 51
polyorder = 3
smoothed_signal = signal.savgol_filter(noisy_signal, window_length, polyorder)

# Plot
plt.figure(figsize=(12, 8))
plt.plot(t, clean_signal, 'g-', linewidth=2, label='Clean signal', alpha=0.7)
plt.plot(t, noisy_signal, 'b-', alpha=0.3, label='Noisy signal')
plt.plot(t, smoothed_signal, 'r-', linewidth=2, label='Smoothed signal')
plt.xlabel('Time')
plt.ylabel('Amplitude')
plt.title('Time Series Denoising with Savitzky-Golay Filter')
plt.legend()
plt.grid(True)
plt.show()

# Error metrics
mse_noisy = np.mean((noisy_signal - clean_signal)**2)
mse_smoothed = np.mean((smoothed_signal - clean_signal)**2)
print(f"MSE (noisy): {mse_noisy:.4f}")
print(f"MSE (smoothed): {mse_smoothed:.4f}")
print(f"Improvement: {(1 - mse_smoothed/mse_noisy)*100:.2f}%")
```

### Peak Detection

```python
# Signal with peaks
x = np.linspace(0, 10, 1000)
y = np.sin(x) * np.exp(-0.1*x) + 0.1*np.random.randn(len(x))

# Find peaks
peaks, properties = signal.find_peaks(y, height=0.3, distance=50, prominence=0.2)

# Plot
plt.figure(figsize=(12, 6))
plt.plot(x, y, 'b-', linewidth=2, label='Signal')
plt.plot(x[peaks], y[peaks], 'ro', markersize=10, label='Detected peaks')
plt.xlabel('x')
plt.ylabel('y')
plt.title('Peak Detection')
plt.legend()
plt.grid(True)
plt.show()

print(f"Number of peaks detected: {len(peaks)}")
print(f"Peak locations: {x[peaks]}")
print(f"Peak heights: {y[peaks]}")
```

---

## Practice Exercises

### Exercise 1: ECG Signal Processing
```python
# Simulate ECG signal
# Remove baseline wander with high-pass filter
# Remove powerline interference with notch filter
# Detect R-peaks
```

### Exercise 2: Audio Classification Features
```python
# Load audio samples
# Extract MFCC features
# Create feature matrix for ML
```

### Exercise 3: Vibration Analysis
```python
# Analyze machinery vibration signal
# Identify dominant frequencies
# Detect anomalies using spectral analysis
```

---

## Key Takeaways

1. **Filtering**: Butterworth filters for frequency-selective filtering
2. **FFT**: Fast frequency analysis of signals
3. **STFT**: Time-frequency analysis for non-stationary signals
4. **Convolution**: Essential for filtering and feature extraction
5. **Windows**: Reduce spectral leakage in FFT
6. **Wavelets**: Multi-resolution time-frequency analysis
7. **Feature extraction**: Spectral features for ML
8. **Always visualize**: Time and frequency domains

---

## 🔗 Navigation

- **Previous**: [04 - Interpolation and Integration](./04-Interpolation-Integration.md)
- **Next**: [2.5 Best Practices](../../2.5-Python-Best-Practices/README.md)
- **Up**: [2.4 SciPy](./README.md)
