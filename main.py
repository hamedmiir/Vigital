import pygame
import numpy as np
import librosa
import random
import os
import math

# Initialize pygame
pygame.init()

# Define the path to the music file
music_file_path = '/Users/hamed/Documents/Hamed/Digital Art Project/Sacrifice-Anyma.mp3'
music_dir = os.path.dirname(music_file_path)

# Set up the display
screen = pygame.display.set_mode((800, 600))

# Load the audio file
y, sr = librosa.load(music_file_path)

# Perform STFT with a defined hop length
hop_length = 512
D = np.abs(librosa.stft(y, hop_length=hop_length))

# Normalize D
D = D / np.max(D)

# Start the music
pygame.mixer.music.load(music_file_path)
pygame.mixer.music.play()

# Initialize shape properties
num_shapes = 20
shapes = [{'pos': (random.randint(0, 800), random.randint(0, 600)),
           'radius': random.randint(10, 30),
           'growth': random.choice([-1, 1]),
           'angle': random.uniform(0, 2 * math.pi),
           'rotation': random.uniform(-0.05, 0.05)} for _ in range(num_shapes)]

# Define color palette
colors = [
    (0, 255, 0),     # Green
    (0, 0, 255),     # Blue
    (128, 0, 128),   # Purple
    (255, 0, 0),     # Red
    (0, 0, 0),       # Black
    (255, 255, 255)  # White
]

# Create directory to save frames
frames_dir = os.path.join(music_dir, "frames")
if not os.path.exists(frames_dir):
    os.makedirs(frames_dir)

frame_count = 0

def draw_gothic_arch(screen, color, center, size):
    points = [
        (center[0] - size, center[1]),
        (center[0], center[1] - size),
        (center[0] + size, center[1])
    ]
    pygame.draw.polygon(screen, color, points)

running = True
clock = pygame.time.Clock()
while running:
    for event in pygame.event.get():
        if event.type == pygame.QUIT:
            running = False

    # Check if the music is still playing
    if not pygame.mixer.music.get_busy():
        break

    # Clear the screen
    screen.fill((0, 0, 0))

    # Get the current frame of the music
    pos_ms = pygame.mixer.music.get_pos()
    if pos_ms != -1:
        # Calculate the current frame using the hop length
        current_frame = int((pos_ms / 1000) * sr / hop_length)

        if current_frame < D.shape[1]:
            spectrum = D[:, current_frame]

            # Draw the spectrum with more complex shapes and colors
            for i in range(len(spectrum)):
                color = random.choice(colors)
                height = int(600 * spectrum[i])

                # Draw rectangles
                pygame.draw.rect(screen, color, (i * 8, 600 - height, 8, height))

                # Draw circles
                radius = height // 10
                pygame.draw.circle(screen, color, (i * 8 + 4, 600 - height), radius)

                # Draw triangles
                points = [(i * 8, 600), (i * 8 + 4, 600 - height), (i * 8 + 8, 600)]
                pygame.draw.polygon(screen, color, points)

                # Draw gothic arches
                draw_gothic_arch(screen, color, (i * 8 + 4, 600 - height), radius)

    # Update and draw growing/shrinking and rotating shapes
    for shape in shapes:
        pos = shape['pos']
        radius = shape['radius']
        growth = shape['growth']
        angle = shape['angle']
        rotation = shape['rotation']

        # Change radius
        if radius >= 50 or radius <= 10:
            shape['growth'] *= -1
        shape['radius'] += shape['growth']

        # Rotate shape
        shape['angle'] += shape['rotation']

        # Draw shape
        shape_color = random.choice(colors)

        # Draw moving circle
        x = int(pos[0] + math.cos(angle) * 100)
        y = int(pos[1] + math.sin(angle) * 100)
        pygame.draw.circle(screen, shape_color, (x, y), radius)

        # Draw moving polygon
        num_sides = 6
        poly_points = []
        for j in range(num_sides):
            angle = 2 * math.pi * j / num_sides
            x = int(pos[0] + math.cos(angle) * radius)
            y = int(pos[1] + math.sin(angle) * radius)
            poly_points.append((x, y))
        pygame.draw.polygon(screen, shape_color, poly_points)

        # Draw moving gothic arch
        arch_center = (int(pos[0] + math.cos(angle + math.pi / 4) * 100), int(pos[1] + math.sin(angle + math.pi / 4) * 100))
        draw_gothic_arch(screen, shape_color, arch_center, radius)

    # Save the current frame
    pygame.image.save(screen, os.path.join(frames_dir, f"frame_{frame_count:05d}.png"))
    frame_count += 1

    pygame.display.flip()
    clock.tick(60)

pygame.quit()

# After quitting pygame, encode frames to a video using ffmpeg
os.system(f"ffmpeg -framerate 60 -i {frames_dir}/frame_%05d.png -c:v libx264 -pix_fmt yuv420p {music_dir}/output_video.mp4")

# Clean up frames
for file_name in os.listdir(frames_dir):
    os.remove(os.path.join(frames_dir, file_name))
os.rmdir(frames_dir)
