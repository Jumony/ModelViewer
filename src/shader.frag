#version 330 core

#define MAX_DIFFUSE 4
#define MAX_SPECULAR 4

out vec4 FragColor;

in vec3 Normal;
in vec2 TexCoords;
in vec3 FragPos;

uniform sampler2D texture_diffuse[MAX_DIFFUSE];
uniform sampler2D texture_specular[MAX_SPECULAR];
uniform int diffuseCount;
uniform int specularCount;
uniform bool hasTextures;
uniform vec3 lightColor;
uniform vec3 lightPos;

void main()
{   
    vec4 color = vec4(0.0f);

    vec3 norm = normalize(Normal);
    vec3 lightDir = normalize(lightPos - FragPos);
    float diff = max(dot(norm, lightDir), 0.0f);
    vec3 diffuse = diff * lightColor;

    if (!hasTextures) {
        color = vec4(diffuse.r * 0.5, diffuse.g * 0.5, diffuse.b * 0.5, 1);
    }
    else {
        for (int i = 0; i < diffuseCount; i++) {
            color += texture(texture_diffuse[i], TexCoords) * vec4(diffuse, 1.0);

        }
    }

    FragColor = color;
}

