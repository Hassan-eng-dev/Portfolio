<script setup lang="ts">
const client = useSupabaseClient();
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const submitting = ref(false);
const errorMessage = ref<string | null>(null);

async function onSubmit(payload: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  published: boolean;
  sortOrder: number;
  coverUrl: string | null;
  images: { url: string; altText: string }[];
}) {
  submitting.value = true;
  errorMessage.value = null;

  try {
    const project = await createProject(client, {
      title: payload.title,
      slug: slugify(payload.title),
      description: payload.description,
      category: payload.category,
      tags: payload.tags,
      published: payload.published,
      sort_order: payload.sortOrder,
      cover_image_url: payload.coverUrl,
    });

    await replaceProjectImages(
      client,
      project.id,
      payload.images.map((image, index) => ({
        image_url: image.url,
        alt_text: image.altText || null,
        sort_order: index,
      })),
    );

    await router.push(localePath("/admin"));
  } catch (err) {
    errorMessage.value =
      err instanceof Error ? err.message : t('admin.newProject.genericError');
  } finally {
    submitting.value = false;
  }
}

useSeoMeta({ title: () => t('admin.newProject.seoTitle') });
</script>

<template>
  <div>
    <NuxtLinkLocale
      to="/admin"
      class="text-sm font-medium text-ink-500 hover:text-ink-900"
    >
      <span class="inline-block rtl:scale-x-[-1]">&larr;</span> {{ t('admin.newProject.backToDashboard') }}
    </NuxtLinkLocale>
    <h1 class="mt-3 font-display text-2xl text-ink-900">{{ t('admin.newProject.heading') }}</h1>

    <p
      v-if="errorMessage"
      role="alert"
      class="mt-6 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700"
    >
      {{ errorMessage }}
    </p>

    <div class="mt-8">
      <AdminProjectForm
        :submitting="submitting"
        :submit-label="t('admin.newProject.submitLabel')"
        @submit="onSubmit"
      />
    </div>
  </div>
</template>
