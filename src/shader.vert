#version 330 core
layout (location = 0) in vec3 aPos;
layout (location = 1) in vec3 aNormal;
layout (location = 2) in vec2 aTexCoords;
layout (location = 3) in vec3 aTangent;
layout (location = 4) in vec3 aBitangent;

out vec3 Normal;
out vec2 TexCoords;
out vec3 FragPos;
out mat3 TBN;

uniform mat4 model;
uniform mat4 view;
uniform mat4 projection;

void main()
{
    /* We use the normal matrix because normals cant be transformed like regular vertices. If we try 
    * to apply non-uniform transformations like a non-uniform scale, then the vertices would be 
    * transformed correctly by the model matrix but the normal won't. You can do this check yourself
    * Get a point in 3D space with its correct normal, multiply both by a non-uniform scale matrix.
    * Check and see if their dot products are 0. You will find that they are not 0, meaning
    * the normal vector is no longer orthogonal to the point.
    * https://deepraster.com/articles/normal-matrix-explained/
    */
    mat3 normalMatrix = transpose(inverse(mat3(model)));

    Normal = normalize(normalMatrix * aNormal);
    vec3 T = normalize(mat3(model) * aTangent);
    T = normalize(T - dot(T, Normal) * Normal);

    vec3 B = cross(Normal, T);

    vec3 originalB = normalize(mat3(model) * aBitangent);
    if (dot(B, originalB) < 0.0f)
        B = -B;
    TBN = mat3(T, B, Normal);

    TexCoords = aTexCoords;    
    gl_Position = projection * view * model * vec4(aPos, 1.0);
    FragPos = vec3(model * vec4(aPos, 1.0));
}

