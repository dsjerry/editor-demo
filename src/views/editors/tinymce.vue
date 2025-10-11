<script setup lang="ts">
import Editor from '@tinymce/tinymce-vue';
import Navigation from '../../components/Navigation.vue';
</script>

<template>
    <main style="height: 100%; display: flex; flex-direction: column">
        <navigation />
        <div style="flex: 1; overflow: hidden">
            <editor
                id="ffdc45f9-2362-434a-a3ac-42ff9bdea380"
                license-key="gpl"
                api-key="no-api-key"
                :init="{
                    plugins:
                        'advlist anchor autolink charmap code fullscreen help image insertdatetime link lists media preview searchreplace table visualblocks wordcount',
                    toolbar:
                        'undo redo | styles | bold italic underline strikethrough | alignleft aligncenter alignright alignjustify | bullist numlist outdent indent | link image',
                    branding: false,
                    promotion: false,
                    height: '100%'
                }"
            />
        </div>
    </main>
</template>

<style scoped></style>
