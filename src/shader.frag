#version 330 core
out vec4 FragColor;

in vec2 TexCoords;

uniform sampler2D texture_diffuse1;
uniform bool hasTextures;

void main()
{   
    if (!hasTextures) {
        FragColor = vec4(0.5, 0.5, 0.5, 1);
    }
    else {
        FragColor = texture(texture_diffuse1, TexCoords);
    }

}

