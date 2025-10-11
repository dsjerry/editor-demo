<template>
    <nav class="navigation">
        <div class="nav-container">
            <div class="nav-brand">
                <router-link to="/" class="brand-link">
                    📚 Any Editor
                </router-link>
            </div>

            <div class="nav-links">
                <router-link
                    to="/"
                    class="nav-link"
                    :class="{ active: $route.path === '/' }"
                >
                    首页
                </router-link>

                <router-link
                    to="/editors/onlyoffice"
                    class="nav-link"
                    :class="{ active: $route.path === '/editors/onlyoffice' }"
                >
                    OnlyOffice
                </router-link>

                <router-link
                    to="/editors/canvas-editor"
                    class="nav-link"
                    :class="{
                        active: $route.path === '/editors/canvas-editor',
                    }"
                >
                    Canvas Editor
                </router-link>

                <router-link
                    to="/editors/monaco-editor"
                    class="nav-link"
                    :class="{
                        active: $route.path === '/editors/monaco-editor',
                    }"
                >
                    Monaco Diff
                </router-link>

                <router-link
                    to="/editors/tinymce"
                    class="nav-link"
                    :class="{
                        active: $route.path === '/editors/tinymce',
                    }"
                >
                    TinyMCE
                </router-link>
            </div>
        </div>
    </nav>
</template>

<style scoped>
.navigation {
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.nav-container {
    margin: 0 auto;
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 1rem 2rem;
}

.nav-brand {
    font-size: 1.5rem;
    font-weight: 700;
}

.brand-link {
    color: white;
    text-decoration: none;
    transition: opacity 0.3s ease;
}

.brand-link:hover {
    opacity: 0.8;
}

.nav-links {
    display: flex;
    gap: 2rem;
}

.nav-link {
    color: white;
    text-decoration: none;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.3s ease;
    font-weight: 500;
}

.nav-link:hover {
    background: rgba(255, 255, 255, 0.1);
    transform: translateY(-1px);
}

.nav-link.active {
    background: rgba(255, 255, 255, 0.2);
    box-shadow: 0 2px 8px rgba(0, 0, 0, 0.1);
}

@media (max-width: 768px) {
    .nav-container {
        padding: 1rem;
        flex-direction: column;
        gap: 1rem;
    }

    .nav-links {
        gap: 1rem;
    }

    .nav-link {
        padding: 0.5rem 0.75rem;
        font-size: 0.9rem;
    }
}
</style>
