#version 330 core

#define MAX_DIFFUSE 4
#define MAX_SPECULAR 4

out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D texture_diffuse[MAX_DIFFUSE];
uniform sampler2D texture_specular[MAX_SPECULAR];
uniform int diffuseCount;
uniform int specularCount;
uniform bool hasTextures;

void main()
{   
    vec4 color = vec4(0.0f);

    if (!hasTextures) {
        color = vec4(0.5, 0.5, 0.5, 1);
    }
    else {
        for (int i = 0; i < diffuseCount; i++) {
            color += texture(texture_diffuse[i], TexCoords);
        }
    }

    FragColor = color;
}

