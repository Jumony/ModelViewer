#version 330 core

#define MAX_DIFFUSE 4
#define MAX_SPECULAR 4
#define MAX_NORMAL 4

out vec4 FragColor;

in vec3 Normal;
in vec2 TexCoords;
in vec3 FragPos;
in mat3 TBN;

uniform sampler2D texture_diffuse[MAX_DIFFUSE];
uniform sampler2D texture_specular[MAX_SPECULAR];
uniform sampler2D texture_normal[MAX_NORMAL];

uniform int diffuseCount;
uniform int specularCount;
uniform int normalCount;

uniform bool hasTextures;

uniform vec3 lightColor;
uniform vec3 lightPos;

void main() {   
    /* Debug Normal Maps
    vec3 normalMap = texture(texture_normal[0], TexCoords).rgb;
    FragColor = vec4(normalMap, 1.0);
    */
    vec4 color = vec4(0.0f);

    vec3 norm = normalize(Normal);

    if (normalCount > 0) {
        vec3 normalMap = texture(texture_normal[0], TexCoords).rgb;
        normalMap = normalize(normalMap * 2.0 - 1.0);
        norm = normalize(TBN * normalMap);
    }

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

