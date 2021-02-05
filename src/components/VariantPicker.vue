<template>
    <div class="field variant-picker">
        <label class="label">{{option.name}}</label>
        <div class="select">
            <select @change="onOptionChange">
                <option v-for="value in option.values" :key="`${option.name}-${value}`">
                    {{value}}
                </option>
            </select>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VariantPicker',
    props: {
        option: {
            type: Object,
            required: true,
        }
    },
    methods: {
        onOptionChange(event) {
            this.$emit('optionChanged', this.option.name, event.target.value);
        }
    }
}
</script>

<style>

</style>